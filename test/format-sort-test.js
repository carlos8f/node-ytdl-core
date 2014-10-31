var fs     = require('fs');
var path   = require('path');
var qs     = require('querystring');
var util   = require('../lib/util');
var assert = require('assert');


var formats = [
  {
    "fallback_host": "tc.v12.cache8.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ipbits=0&ip=24.4.248.4&signature=C3B4C852F08CA4C072510562008C911E63FDC391.BA60CA6BBB29AB1127075D146697ED3538A05AF4&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&mv=m&ratebypass=yes&source=youtube&ms=au&itag=22&initcwndbps=1335000&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Cratebypass%2Csource%2Cupn%2Cexpire&upn=3VrarWcXtIs&key=yt5",
    "quality": "hd720",
    "itag": "22",
    "type": "video/mp4; codecs=\"avc1.64001F, mp4a.40.2\"",
    "container": "mp4",
    "resolution": "720p",
    "encoding": "H.264",
    "profile": "high",
    "bitrate": "2-3",
    "audioEncoding": "aac",
    "audioBitrate": 192
  },
  {
    "fallback_host": "tc.v23.cache3.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ipbits=0&ip=24.4.248.4&signature=5A7ACAA93362E1B08E98101FE02BB3ABF631617F.2B95ED6BB07195A88CA7E57F9D4946E36460A3EC&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&mv=m&ratebypass=yes&source=youtube&ms=au&itag=43&initcwndbps=1335000&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Cratebypass%2Csource%2Cupn%2Cexpire&upn=3VrarWcXtIs&key=yt5",
    "quality": "medium",
    "itag": "43",
    "type": "video/webm; codecs=\"vp8.0, vorbis\"",
    "container": "webm",
    "resolution": "360p",
    "encoding": "VP8",
    "profile": null,
    "bitrate": "0.5",
    "audioEncoding": "vorbis",
    "audioBitrate": 128
  },
  {
    "fallback_host": "tc.v24.cache5.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ipbits=0&ip=24.4.248.4&signature=E1B09C64E3C11A785E5FB3EFBFA598B1F79CCF46.62BFABDDAA0F693F21D72047739F665F26835878&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&mv=m&ratebypass=yes&source=youtube&ms=au&itag=18&initcwndbps=1335000&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Cratebypass%2Csource%2Cupn%2Cexpire&upn=3VrarWcXtIs&key=yt5",
    "quality": "medium",
    "itag": "18",
    "type": "video/mp4; codecs=\"avc1.42001E, mp4a.40.2\"",
    "container": "mp4",
    "resolution": "360p",
    "encoding": "H.264",
    "profile": "baseline",
    "bitrate": "0.5",
    "audioEncoding": "aac",
    "audioBitrate": 96
  },
  {
    "fallback_host": "tc.v6.cache5.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ipbits=0&ip=24.4.248.4&signature=1DCA61253F3D33E8C5690F055E89FFB58301B07D.4B89CE546202A3A531F9BA4F937FBFFBE124714E&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&mv=m&source=youtube&ms=au&itag=5&initcwndbps=1335000&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=3VrarWcXtIs&key=yt5",
    "quality": "small",
    "itag": "5",
    "type": "video/x-flv",
    "container": "flv",
    "resolution": "240p",
    "encoding": "Sorenson H.283",
    "profile": null,
    "bitrate": "0.25",
    "audioEncoding": "mp3",
    "audioBitrate": 64
  },
  {
    "fallback_host": "tc.v6.cache3.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ipbits=0&ip=24.4.248.4&signature=31ED6C5D4CAC8DAF111EC3E828C953A8C999B736.C5BFE29991182BF6218814FFF0798819FA0589B&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&mv=m&source=youtube&ms=au&itag=36&initcwndbps=1335000&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=3VrarWcXtIs&key=yt5",
    "quality": "small",
    "itag": "36",
    "type": "video/3gpp; codecs=\"mp4v.20.3, mp4a.40.2\"",
    "container": "3gp",
    "resolution": "240p",
    "encoding": "MPEG-4 Visual",
    "profile": "simple",
    "bitrate": "0.175",
    "audioEncoding": "aac",
    "audioBitrate": 36
  },
  {
    "fallback_host": "tc.v22.cache8.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ipbits=0&ip=24.4.248.4&signature=6258BFB29E38A79F011309E1454BCD0A65AE5297.A41A9822EF0314CAEF7B24066FE7F41A63665933&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&mv=m&source=youtube&ms=au&itag=17&initcwndbps=1335000&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=3VrarWcXtIs&key=yt5",
    "quality": "small",
    "itag": "17",
    "type": "video/3gpp; codecs=\"mp4v.20.3, mp4a.40.2\"",
    "container": "3gp",
    "resolution": "144p",
    "encoding": "MPEG-4 Visual",
    "profile": "simple",
    "bitrate": "0.05",
    "audioEncoding": "aac",
    "audioBitrate": 24
  },
  {
    "type": "video/mp4; codecs=\"avc1.640032\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=B1764165C16FC5FC5652D0AA55930F599FA91F37.4B73786713C8C941447779140ADA6FF2D8B9F6D4&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=259013395&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=264&lmt=1404631750472457&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "259013395",
    "itag": "264",
    "lmt": "1404631750472457",
    "init": "0-709",
    "index": "710-1593",
    "fps": "24",
    "bitrate": "4-5",
    "size": "2560x1440",
    "container": "mp4",
    "resolution": "1440p",
    "encoding": "H.264",
    "profile": "high",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/mp4; codecs=\"avc1.640028\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=A29D355119E8ED01117B18B220C8EDBB19ADCA12.7AA90946D32AF0FAF23B5107C95DE790D2DEB5A7&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=165481443&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=137&lmt=1404631743247173&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "165481443",
    "itag": "137",
    "lmt": "1404631743247173",
    "init": "0-710",
    "index": "711-1594",
    "fps": "24",
    "bitrate": "2-3",
    "size": "1920x1080",
    "container": "mp4",
    "resolution": "1080p",
    "encoding": "H.264",
    "profile": "high",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=6958A9C65E8EEBE88ECF1C61470251E70D4485E.ED98BD9A45CE040BBF7611D9B5583317842FC816&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=86353165&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=248&lmt=1405396281284196&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "86353165",
    "itag": "248",
    "lmt": "1405396281284196",
    "init": "0-234",
    "index": "235-1488",
    "fps": "1",
    "bitrate": "1.895",
    "size": "1920x1080",
    "container": "webm",
    "resolution": "1080p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/mp4; codecs=\"avc1.4d401f\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=093957EB357C3DF85A4D005C8DE7C890F6566674.4D931024A0DA0433C5910AAD7F17E511EE6DE413&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=85922158&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=136&lmt=1404631721964254&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "85922158",
    "itag": "136",
    "lmt": "1404631721964254",
    "init": "0-708",
    "index": "709-1592",
    "fps": "24",
    "bitrate": "1-1.5",
    "size": "1280x720",
    "container": "mp4",
    "resolution": "720p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=7F453BD128C56A994934802E349DAD7BF4A50B2B.E6B4BA23AB9BF5C65B4D925F88C5A4B74E486FF4&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=50942841&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=247&lmt=1405401567845089&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "50942841",
    "itag": "247",
    "lmt": "1405401567845089",
    "init": "0-234",
    "index": "235-1479",
    "fps": "1",
    "bitrate": "1.184",
    "size": "1280x720",
    "container": "webm",
    "resolution": "720p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/mp4; codecs=\"avc1.4d401e\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=F6202AAE5A87F6AD1B7076564CF22E83EF19E972.237447666B552D27C28E37E4F19FE6D0208736B7&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=41786317&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=135&lmt=1404631713515362&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "41786317",
    "itag": "135",
    "lmt": "1404631713515362",
    "init": "0-708",
    "index": "709-1592",
    "fps": "24",
    "bitrate": "0.5-1",
    "size": "854x480",
    "container": "mp4",
    "resolution": "480p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=049D7FFADE00C727F9AAB80EFFA5E080294C6219.9DE23742D447D369D7AB9B47EF7374CF04688A64&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=25867860&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=244&lmt=1405401494426026&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "25867860",
    "itag": "244",
    "lmt": "1405401494426026",
    "init": "0-234",
    "index": "235-1457",
    "fps": "1",
    "bitrate": "0.585",
    "size": "854x480",
    "container": "webm",
    "resolution": "480p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/mp4; codecs=\"avc1.4d401e\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=F79ED45D9DFFCA152EAC8B28ABCB6E6BFD6DADBE.F021A1174CDDDB30786AC9CFDA41BD36A0001B82&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=20887943&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=134&lmt=1404631745700332&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "20887943",
    "itag": "134",
    "lmt": "1404631745700332",
    "init": "0-708",
    "index": "709-1592",
    "fps": "24",
    "bitrate": "0.3-0.4",
    "size": "640x360",
    "container": "mp4",
    "resolution": "360p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=32D12DC868665A01C3CA416431712E49C0B32DA9.A3AD05167D56287A2E0D62CEF188EC71AA9197AC&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=13295250&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=243&lmt=1405396037370114&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "13295250",
    "itag": "243",
    "lmt": "1405396037370114",
    "init": "0-234",
    "index": "235-1431",
    "fps": "1",
    "bitrate": "0.26",
    "size": "640x360",
    "container": "webm",
    "resolution": "360p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/mp4; codecs=\"avc1.4d4015\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=1D551C4DB0E6D4DD374841033901CA09B3A251E6.AA1153A29811838F666B10AEC034E4C053CA359E&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=10825049&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=133&lmt=1404631711025167&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "10825049",
    "itag": "133",
    "lmt": "1404631711025167",
    "init": "0-672",
    "index": "673-1556",
    "fps": "24",
    "bitrate": "0.2-0.3",
    "size": "426x240",
    "container": "mp4",
    "resolution": "240p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=3B23B8A2A630843E72C6588C94333E4C7A58DA18.4DDFA2D92C051269AD889531032B2F7BFB604399&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=6945712&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=242&lmt=1405397968424096&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "6945712",
    "itag": "242",
    "lmt": "1405397968424096",
    "init": "0-233",
    "index": "234-1430",
    "fps": "1",
    "bitrate": "0.14",
    "size": "426x240",
    "container": "webm",
    "resolution": "240p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "video/mp4; codecs=\"avc1.42c00c\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=B562C447ECB4435CAB22F761E163111600F5ECD1.8A30D9279D01C60A9231582CED70DCAA1B5AF5A&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=4829570&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=160&lmt=1404631711027795&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "4829570",
    "itag": "160",
    "lmt": "1404631711027795",
    "init": "0-670",
    "index": "671-1554",
    "fps": "12",
    "bitrate": "0.1",
    "size": "256x144",
    "container": "mp4",
    "resolution": "144p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "type": "audio/webm; codecs=\"vorbis\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=4F84C96F51452E6C1E90DE063BD83F00DD9AD740.315294921DBA8C07E9CA31A25A1115A97F8A0294&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=5060776&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.258&mv=m&source=youtube&ms=au&itag=171&lmt=1405395969597746&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "5060776",
    "itag": "171",
    "lmt": "1405395969597746",
    "init": "0-4451",
    "index": "4452-5060",
    "fps": "1",
    "bitrate": null,
    "container": "webm",
    "resolution": null,
    "encoding": null,
    "profile": null,
    "audioEncoding": "vorbis",
    "audioBitrate": 128
  },
  {
    "type": "audio/mp4; codecs=\"mp4a.40.2\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=644CEBF6E25CF1CAB6EC367E06FF1A6FE2F45491.785FA17D490061FFF3273ECB407697DA44F7A741&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=5673137&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.337&mv=m&source=youtube&ms=au&itag=140&lmt=1404631715119472&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "5673137",
    "itag": "140",
    "lmt": "1404631715119472",
    "init": "0-591",
    "index": "592-1055",
    "bitrate": null,
    "container": "mp4",
    "resolution": null,
    "encoding": null,
    "profile": null,
    "audioEncoding": "aac",
    "audioBitrate": 128
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=AADFF35182D6403A021E459803242D28A0D46DE6.952B2C77090BE2780925C909AA4530EE5182C527&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=1125143783&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=272&lmt=1405406326201247&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "1125143783",
    "itag": "272",
    "lmt": "1405406326201247",
    "init": "0-234",
    "index": "235-1500",
    "fps": "1",
    "bitrate": "54301810",
    "size": "3840x2160"
  },
  {
    "type": "video/webm; codecs=\"vp9\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=26ADAC8348A8362F447BE5B34B5E4CBBB162B3D3.2D5E8955D36161C4E62F359B1ADE71331C60364C&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=644479328&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.228&mv=m&source=youtube&ms=au&itag=271&lmt=1405398910617714&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "644479328",
    "itag": "271",
    "lmt": "1405398910617714",
    "init": "0-234",
    "index": "235-1498",
    "fps": "1",
    "bitrate": "36911164",
    "size": "2560x1440"
  },
  {
    "type": "video/mp4; codecs=\"avc1.640033\"",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?ip=24.4.248.4&initcwndbps=1335000&ipbits=0&signature=D0CC8826DC01E594C1221D15CBAF701F7ED85E7E.48F3C601CE9DD1F64C07EF130115F970276C8321&gir=yes&mt=1414715240&fexp=930666%2C932404%2C934040%2C935680%2C943911%2C945240%2C947209%2C947215%2C951809%2C952302%2C952901%2C953912%2C955105%2C957103%2C957201&expire=1414736896&sver=3&clen=819770543&id=o-AMByECVzXHoxQxqgRXITaN3yesMrObwFYG9mNb5NF4nN&mm=31&dur=353.269&mv=m&source=youtube&ms=au&itag=138&lmt=1404631818209604&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire&upn=gWIbCxaOsak&key=yt5",
    "clen": "819770543",
    "itag": "138",
    "lmt": "1404631818209604",
    "init": "0-710",
    "index": "711-1594",
    "fps": "24",
    "bitrate": "24264119",
    "size": "3840x2160"
  }
];

describe('util.sortFormats()', function() {
  it('Sorts available formats from highest to lowest quality', function() {
    var expected = ['272', '138', '271', '264', '137', '248', '22', '247', '136', '244', '135', '43',
      '18', '134', '243', '5', '133', '36', '242', '160', '17', '171', '140'];
    formats.sort(util.sortFormats);
    assert.deepEqual(formats.map(function (format) { return format.itag }), expected);
  });
});


describe('util.chooseFormat', function() {
  describe('with no options', function() {
    it('Chooses highest quality', function() {
      var format = util.chooseFormat(formats, {});
      assert.equal(format.itag, '272');
    });
  });

  describe('with a filter', function() {
    it('Tries to find a format that matches', function() {
      var format = util.chooseFormat(formats, {
        filter: function(format) { return format.container === 'mp4'; }
      });
      assert.equal(format.itag, '264');
    });

    describe('that doesn\'t match any format', function() {
      it('Returns an error instead', function() {
      var err = util.chooseFormat(formats, {
        filter: function() { return false; }
      });
      assert.equal(err.message, 'no formats found with custom filter');
      });
    });
  });

  describe('with lowest quality wanted', function() {
    it('Chooses lowest itag', function() {
      var format = util.chooseFormat(formats, { quality: 'lowest' });
      assert.equal(format.itag, '140');
    });
  });

  describe('with itag given', function() {
    it('Chooses matching format', function() {
      var format = util.chooseFormat(formats, { quality: 5 });
      assert.equal(format.itag, '5');
    });

    describe('that is not in the format list', function() {
      it('Returns an error', function() {
        var err = util.chooseFormat(formats, { quality: 42 });
        assert.equal(err.message, 'No such format found: 42');
      });
    });
  });
});
