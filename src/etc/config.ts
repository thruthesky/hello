/**
 * 동적으로 변하는 값을 여기에 기록하지 않는다.
 * 또한 여기서 설정하는 값은 동적으로 변경시키지 않는다.
 * 
 */
declare let navigator;
let language = navigator.languages && navigator.languages[0] || // Chrome / Firefox
               navigator.language ||   // All browsers
               navigator.userLanguage; // IE <= 10


export const SETTING_LANGUAGE = 'setting.language';
export const SETTING_FORUM_LIST_STYLE = 'setting.forum-list-style';

let lang = language.substr( 0, 2 );
if ( lang != 'ko' ) lang = 'en';
export let Config = {
    language: lang,     // default user language. it is either 'ko' or 'en'.
    // urlPhilgoServer: 'http://test.philgo.com/index.php' // For test server.
    // urlPhilgoServer: 'https://www.philgo.com/index.php' // For real server.
}
