const API_BASE = "http://localhost:5000"
//!用户相关
const API_LOGIN_USER = "/login_user"
const API_GET_USER = "/get_user/<user_id>"
// http://127.0.0.1:5000/add_user?user_name=%27ZX%27&user_passwd=%27xxx%27
const API_ADD_USER = "/add_user"
// http://127.0.0.1:5000/follow_user?user_id=%1%27&follow_user_id=%272%27
const API_FOLLOW_USER = "/follow_user/<user_id>/<follow_user_id>"

//!视频相关
const API_ADD_VIDEO = "/add_video"
const API_GET_VIDEO = "/get_video/<video_id>"
const API_GET_VIDEO_BY_USER = "/get_video_by_user_id/<user_id>"
const API_LIKE_VIDEO = "/like_video/<user_id>/<video_id>"
const API_WATCH_VIDEO = "/watch_video/<user_id>/<video_id>/<duration>"
const API_DELETE_VIDEO = "/delete_video/<video_id>"
const API_UPDATE_VIDEO = "/update_video"
const API_FAVORITE_VIDEO = "/favorite_video/<user_id>/<video_id>"


//!评论相关
const API_GET_COMMENT = "/get_comments/<video_id>"
const API_COMMENT_VIDEO = "/comment_video/"
const API_REPLY_COMMENT = "/comment_comment/"


//!状态码
const STAT_OK = 200
const STAT_FAIL = 404

export {
    API_BASE,
    API_LOGIN_USER,
    API_GET_USER,
    API_ADD_USER,
    // http://127.0.0.1:5000/follow_user?user_id=%1%27&follow_user_id=%272%27
    API_FOLLOW_USER,

    //!视频相关
    API_ADD_VIDEO,
    API_GET_VIDEO,
    API_GET_VIDEO_BY_USER,
    API_LIKE_VIDEO,
    API_WATCH_VIDEO,
    API_DELETE_VIDEO,
    API_UPDATE_VIDEO,
    API_FAVORITE_VIDEO,


    //!评论相关
    API_GET_COMMENT,
    API_COMMENT_VIDEO,
    API_REPLY_COMMENT,


    //!状态码
    STAT_OK,
    STAT_FAIL
}

