var fs     = require('fs');
var path   = require('path');
var qs     = require('querystring');
var util   = require('../lib/util');
var assert = require('assert');


var formats = [
  {
    "bitrate": "0.26",
    "clen": "13295250",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=13295250&lmt=1405396037370114&signature=D04828D64D766C3D3A9F0A5581813F1C7D78934E.E2E422F4A8996A78DFF6E464264E1ABB7EAD5085&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=243&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "243",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "640x360",
    "init": "0-234",
    "lmt": "1405396037370114",
    "index": "235-1431",
    "fps": "1",
    "container": "webm",
    "resolution": "360p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "0.1",
    "clen": "4829570",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=4829570&lmt=1404631711027795&signature=45914529B3B27D9A98EF6B0C00EEDFD97AB24BB1.68A24F0F592F2FA9E90FABEA34239947F3F8FCE4&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=160&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "160",
    "type": "video/mp4; codecs=\"avc1.42c00c\"",
    "size": "256x144",
    "init": "0-670",
    "lmt": "1404631711027795",
    "index": "671-1554",
    "fps": "12",
    "container": "mp4",
    "resolution": "144p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "quality": "small",
    "fallback_host": "tc.v6.cache3.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?mm=31&initcwndbps=1083750&sver=3&signature=D767062BEBC9AA82F771E2AD79D65D1F5AC847FE.F7672C4605026220FA4889B1CBC74B9EBB90BA08&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=36&upn=htTPQncBlxg&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
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
    "bitrate": "1-1.5",
    "clen": "85922158",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=85922158&lmt=1404631721964254&signature=16FA345D87B1EDAE8816FE0F2E4B89F26CCDE8AB.3D28895750428D49FD7680C0D50CB8E72E205912&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=136&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "136",
    "type": "video/mp4; codecs=\"avc1.4d401f\"",
    "size": "1280x720",
    "init": "0-708",
    "lmt": "1404631721964254",
    "index": "709-1592",
    "fps": "24",
    "container": "mp4",
    "resolution": "720p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "0.5-1",
    "clen": "41786317",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=41786317&lmt=1404631713515362&signature=362669FE28D7E9BD379092E03F7E4333BFD549B9.612E838A1A122454AAC50156106C9BD48B9A4F25&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=135&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "135",
    "type": "video/mp4; codecs=\"avc1.4d401e\"",
    "size": "854x480",
    "init": "0-708",
    "lmt": "1404631713515362",
    "index": "709-1592",
    "fps": "24",
    "container": "mp4",
    "resolution": "480p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "quality": "medium",
    "fallback_host": "tc.v24.cache5.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?mm=31&ratebypass=yes&initcwndbps=1083750&sver=3&signature=E0DD72CF7E7635676AB8BD08D46FEF3519233288.8AFD89C931CBA409C61CD031451B2C32D84B5A9E&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=18&upn=htTPQncBlxg&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Cratebypass%2Csource%2Cupn%2Cexpire",
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
    "quality": "small",
    "fallback_host": "tc.v6.cache5.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?mm=31&initcwndbps=1083750&sver=3&signature=3017A12B8680F9C63DC19F195DFB3535C840034.9291B1FB25B9C614696357B3B833E809FB623480&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=5&upn=htTPQncBlxg&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
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
    "bitrate": null,
    "clen": "5673137",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.337&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=5673137&lmt=1404631715119472&signature=DA59F08B4971B1D2B8A8C4AC08AE37E6351F0478.F9C689621F5FEE41F835A24F9151785606E5D2CF&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=140&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "140",
    "type": "audio/mp4; codecs=\"mp4a.40.2\"",
    "init": "0-591",
    "lmt": "1404631715119472",
    "index": "592-1055",
    "container": "mp4",
    "resolution": null,
    "encoding": null,
    "profile": null,
    "audioEncoding": "aac",
    "audioBitrate": 128
  },
  {
    "bitrate": "0.2-0.3",
    "clen": "10825049",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=10825049&lmt=1404631711025167&signature=72947F7A6061F95DE6C17D830F9F4C2437D19886.142C3CAC174BB3D63CB2F4C783598AC7FC863232&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=133&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "133",
    "type": "video/mp4; codecs=\"avc1.4d4015\"",
    "size": "426x240",
    "init": "0-672",
    "lmt": "1404631711025167",
    "index": "673-1556",
    "fps": "24",
    "container": "mp4",
    "resolution": "240p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "0.3-0.4",
    "clen": "20887943",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=20887943&lmt=1404631745700332&signature=616F5FD1C0CED8659837630961693114921CD244.7B31B8F93C16ED0B1B8329F83421F875BF85919A&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=134&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "134",
    "type": "video/mp4; codecs=\"avc1.4d401e\"",
    "size": "640x360",
    "init": "0-708",
    "lmt": "1404631745700332",
    "index": "709-1592",
    "fps": "24",
    "container": "mp4",
    "resolution": "360p",
    "encoding": "H.264",
    "profile": "main",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "24264119",
    "clen": "819770543",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=819770543&lmt=1404631818209604&signature=5DA5199D137A98C21DFA0756649F4E54436E960C.55EF922ED24A461084072FEF010741D0ECA98FF1&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=138&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "138",
    "type": "video/mp4; codecs=\"avc1.640033\"",
    "size": "3840x2160",
    "init": "0-710",
    "lmt": "1404631818209604",
    "index": "711-1594",
    "fps": "24",
    "container": "mp4"
  },
  {
    "bitrate": null,
    "clen": "5060776",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.258&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=5060776&lmt=1405395969597746&signature=BCD6B68BFF679C6813673EDAD9E2E18C57A3D4F5.42519930BF736FEA820A7DBCF58496A4CECFE331&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=171&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "171",
    "type": "audio/webm; codecs=\"vorbis\"",
    "init": "0-4451",
    "lmt": "1405395969597746",
    "index": "4452-5060",
    "fps": "1",
    "container": "webm",
    "resolution": null,
    "encoding": null,
    "profile": null,
    "audioEncoding": "vorbis",
    "audioBitrate": 128
  },
  {
    "bitrate": "54301810",
    "clen": "1125143783",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=1125143783&lmt=1405406326201247&signature=E9490F3756D599DE8330A62962C2B9AFDBCAD89D.256FF9E561E0A86F2D32EA904CAABB3D462C6DC1&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=272&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "272",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "3840x2160",
    "init": "0-234",
    "lmt": "1405406326201247",
    "index": "235-1500",
    "fps": "1",
    "container": "webm"
  },
  {
    "bitrate": "0.585",
    "clen": "25867860",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=25867860&lmt=1405401494426026&signature=9203965C0B8C6C1BB5B72D762FB03AC68DCA2D0F.F69457962A5ACF1579BEF7B40463718B3AEDC801&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=244&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "244",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "854x480",
    "init": "0-234",
    "lmt": "1405401494426026",
    "index": "235-1457",
    "fps": "1",
    "container": "webm",
    "resolution": "480p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "1.184",
    "clen": "50942841",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=50942841&lmt=1405401567845089&signature=6D928B2A2D6D3283727DDB24D4D5A80A59E5ECFA.46AEDF7E927BA74E8ACF05B932CB82BD399C8D2&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=247&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "247",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "1280x720",
    "init": "0-234",
    "lmt": "1405401567845089",
    "index": "235-1479",
    "fps": "1",
    "container": "webm",
    "resolution": "720p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "quality": "hd720",
    "fallback_host": "tc.v12.cache8.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?mm=31&ratebypass=yes&initcwndbps=1083750&sver=3&signature=AE9896B23AFF692457626D5EE728C996D04E0491.D99F451CD39BDA4077C5B01CA97C2DC67EFA1F53&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=22&upn=htTPQncBlxg&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Cratebypass%2Csource%2Cupn%2Cexpire",
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
    "bitrate": "1.895",
    "clen": "86353165",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=86353165&lmt=1405396281284196&signature=6479FB5CD794DD1C9EB6222AB6EC6CFFBEC7A91B.C27316A3802B6F942D9DE9B1ED4AAE20F4E83161&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=248&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "248",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "1920x1080",
    "init": "0-234",
    "lmt": "1405396281284196",
    "index": "235-1488",
    "fps": "1",
    "container": "webm",
    "resolution": "1080p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "2-3",
    "clen": "165481443",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=165481443&lmt=1404631743247173&signature=35330E1BFBD19244C7449651C560603D2558AE78.AE372CB5F6B4AE79084F1AB47FE5920198B0B557&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=137&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "137",
    "type": "video/mp4; codecs=\"avc1.640028\"",
    "size": "1920x1080",
    "init": "0-710",
    "lmt": "1404631743247173",
    "index": "711-1594",
    "fps": "24",
    "container": "mp4",
    "resolution": "1080p",
    "encoding": "H.264",
    "profile": "high",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "4-5",
    "clen": "259013395",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.269&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=259013395&lmt=1404631750472457&signature=164969AC422ECD2373D202B3CB5918F59B93905.CC8E71B6D2DF3B80D794D214BB262AF0A9CB0604&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=264&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "264",
    "type": "video/mp4; codecs=\"avc1.640032\"",
    "size": "2560x1440",
    "init": "0-709",
    "lmt": "1404631750472457",
    "index": "710-1593",
    "fps": "24",
    "container": "mp4",
    "resolution": "1440p",
    "encoding": "H.264",
    "profile": "high",
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "bitrate": "0.14",
    "clen": "6945712",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=6945712&lmt=1405397968424096&signature=2824D40919A620FACAD5B55188BEFB49EB605A5F.89A9B08016816178266AF5ED4BF5731F8B214EE3&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=242&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "242",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "426x240",
    "init": "0-233",
    "lmt": "1405397968424096",
    "index": "234-1430",
    "fps": "1",
    "container": "webm",
    "resolution": "240p",
    "encoding": "VP9",
    "profile": null,
    "audioEncoding": null,
    "audioBitrate": null
  },
  {
    "quality": "small",
    "fallback_host": "tc.v22.cache8.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?mm=31&initcwndbps=1083750&sver=3&signature=C2179399310F566E48480F18B2E7907A11549C7F.DA118AC8118DA238E2253F8F28DA54A4E662CD86&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=17&upn=htTPQncBlxg&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
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
    "quality": "medium",
    "fallback_host": "tc.v23.cache3.googlevideo.com",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?mm=31&ratebypass=yes&initcwndbps=1083750&sver=3&signature=D0A4BB4560AEC24A5A253FCB57F3D8E1064288B2.6AC27482EC39BF2EBC2E1035E351F1BFE2241514&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=43&upn=htTPQncBlxg&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=id%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Cmm%2Cms%2Cmv%2Cratebypass%2Csource%2Cupn%2Cexpire",
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
    "bitrate": "36911164",
    "clen": "644479328",
    "url": "http://r13---sn-nwj7knel.googlevideo.com/videoplayback?dur=353.228&mm=31&initcwndbps=1083750&gir=yes&sver=3&clen=644479328&lmt=1405398910617714&signature=1926B8E25030BF2020BDD41F390765431296D9DD.A5974650FBA3E976603A4E2500E022EC245CD29A&ms=au&mv=m&mt=1414719586&source=youtube&ipbits=0&key=yt5&ip=24.4.248.4&expire=1414741302&itag=271&upn=xZ5HPGsFu3U&id=o-ADESB74LYSe2t8iLcZWX83uisEH_IDV9Nb6s8SCr0Pma&fexp=930666%2C932404%2C934040%2C941293%2C947209%2C947215%2C952302%2C952901%2C953912%2C957103%2C957201%2C958300&sparams=clen%2Cdur%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Clmt%2Cmm%2Cms%2Cmv%2Csource%2Cupn%2Cexpire",
    "itag": "271",
    "type": "video/webm; codecs=\"vp9\"",
    "size": "2560x1440",
    "init": "0-234",
    "lmt": "1405398910617714",
    "index": "235-1498",
    "fps": "1",
    "container": "webm"
  }
];

describe('util.sortFormats()', function() {
  it('Sorts available formats from highest to lowest quality', function() {
    var expected = ['272', '138', '271', '264', '137', '248', '22', '247', '136', '244', '135', '43',
      '18', '134', '243', '5', '133', '36', '242', '160', '17', '140', '171'];
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
      assert.equal(format.itag, '138');
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
      assert.equal(format.itag, '171');
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
