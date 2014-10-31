var qs      = require('querystring');
var url     = require('url');
var _       = require('underscore');
var FORMATS = require('./formats');


/**
 * Parses a string representation of amount of milliseconds.
 *
 * @param {String} time
 * @return {Number}
 */
var timeRegexp = /(?:(\d+)h)?(?:(\d+)m(?!s))?(?:(\d+)s)?(?:(\d+)(?:ms)?)?/;
exports.parseTime = function(time) {
  var result = timeRegexp.exec(time.toString());
  var hours  = result[1] || 0;
  var mins   = result[2] || 0;
  var secs   = result[3] || 0;
  var ms     = result[4] || 0;

  return hours * 3600000 + mins * 60000 + secs * 1000 + parseInt(ms, 10);
};


/**
 * Sort formats from highest quality to lowest.
 * By type (video wins over audio), resolution, then video bitrate, then audio bitrate.
 *
 * @param {Object} a
 * @param {Object} b
 */
exports.sortFormats = function(a, b) {
  var aAudio = a.type.indexOf('audio') === 0;
  var bAudio = b.type.indexOf('audio') === 0;
  if (aAudio && bAudio) return 0;
  if (aAudio && !bAudio) return 1;
  if (!aAudio && bAudio) return -1;
  var bitrates = [], heights = [], audioBitrates = [];
  [a.bitrate, b.bitrate].forEach(function (br, idx) {
    if (br) {
      if (br.indexOf('-')) bitrates[idx] = parseFloat(br.split('-')[0], 10) * 1000;
      else if (Number(br) > 100) bitrates[idx] = parseFloat(br, 10);
    }
  });
  [a.size, b.size].forEach(function (size, idx) {
    if (size) {
      if (size.indexOf('x')) heights[idx] = parseFloat(size.split('x')[1], 10);
    }
  });
  [a.resolution, b.resolution].forEach(function (res, idx) {
    if (res) {
      if (res.indexOf('p')) heights[idx] = parseFloat(res.replace('p', ''), 10);
      else if (res.indexOf('x')) heights[idx] = parseFloat(res.split('x')[1], 10);
    }
  });
  [a.audioBitrate, b.audioBitrate].forEach(function (br, idx) {
    if (br) {
      audioBitrates[idx] = parseFloat(br, 10);
    }
  });
  var result = 0;
  [heights, bitrates, audioBitrates].forEach(function (arr, idx) {
    if (result) return;
    if (arr[0] && arr[1]) {
      if (arr[0] > arr[1]) result = -1;
      if (arr[0] < arr[1]) result = 1;
    }
  });
  return result;
};


/**
 * Choose a format depending on the given options.
 *
 * @param {Array.<Object>} formats
 * @param {Object} options
 * @return {Object|Error}
 */
exports.chooseFormat = function(formats, options) {
  if (options.filter) {
    formats = formats.filter(options.filter);
    if (formats.length === 0) {
      return new Error('no formats found with custom filter');
    }
  }

  var format;
  var quality = options.quality || 'highest';
  switch (quality) {
    case 'highest':
      format = formats[0];
      break;

    case 'lowest':
      format = formats[formats.length - 1];
      break;

    default:
      format = formats.filter(function(format) {
        return format.itag === '' + quality;
      })[0];

  }

  if (!format) {
    return new Error('No such format found: ' + quality);
  } else if (format.rtmp) {
    return new Error('rtmp protocol not supported');
  }
  return format;
};


/**
 * Extract string inbetween another.
 *
 * @param {String} haystack
 * @param {String} left
 * @param {String} right
 * @return {String}
 */
exports.between = function(haystack, left, right) {
  var pos;
  pos = haystack.indexOf(left);
  if (pos === -1) { return ''; }
  haystack = haystack.slice(pos + left.length);
  pos = haystack.indexOf(right);
  if (pos === -1) { return ''; }
  haystack = haystack.slice(0, pos);
  return haystack;
};


/**
 * Get video ID.
 *
 * There are a few type of video URL formats.
 *  - http://www.youtube.com/watch?v=VIDEO_ID
 *  - http://youtu.be/VIDEO_ID
 *
 * @param {String} link
 * @return {String}
 */
exports.getVideoID = function(link) {
  var linkParsed = url.parse(link, true);
  var id = linkParsed.hostname === 'youtu.be' ?
    linkParsed.pathname.slice(1) : linkParsed.query.v;
  if (!id) {
    throw new Error('No video id found: ' + link);
  }
  return id;
};


/**
 * @param {Object} info
 * @param {Boolean} debug
 * @return {Array.<Object>}
 */
exports.parseFormats = function(info, debug) {
  var formats = [];
  if (info.url_encoded_fmt_stream_map) {
    formats = formats
      .concat(info.url_encoded_fmt_stream_map.split(','));
  }
  if (info.adaptive_fmts) {
    formats = formats.concat(info.adaptive_fmts.split(','));
  }

  formats = formats
    .map(function(format) {
      var data = qs.parse(format);
      if (data.conn && data.conn.indexOf('rtmp') === 0) {
        data.rtmp = true;
      }

      var meta = FORMATS[data.itag];
      if (!meta && debug) {
        console.warn('No format metadata for itag ' + data.itag + ' found');
      }

      _.extend(data, meta);

      return data;
    });
  delete info.url_encoded_fmt_stream_map;
  delete info.adaptive_fmts;

  formats.sort(exports.sortFormats);
  return formats;
};
