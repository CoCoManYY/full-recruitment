


export function getRedirectPath(data) {
    // 根据用户信息，返回跳转地址
    // user.type /boss /genius
    // user.avatar /bossinfo /geniusinfo
    const {type,avatar}=data.data;
    let url=(type==='boss')?'/boss':'/genius';
    if(!avatar){
        url+='info';
    }
    return url;
}
