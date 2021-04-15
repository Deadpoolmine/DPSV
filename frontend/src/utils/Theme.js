import * as LS from "./LocalStorage";

const THEME_LIGHT = "light";
const THEME_DARK = "dark";

function changeTheme(isChange){
    var theme = LS.GetItem(LS.KEY_THEME);
    if(isChange === true){
        if(theme == null)
            theme = THEME_LIGHT;
        else {
            if(theme === THEME_DARK){
                theme = THEME_LIGHT;
            }
            else {
                theme = THEME_DARK;
            }
        }
    }
    if(theme === THEME_DARK){
        document.documentElement.style.setProperty('--primary-color', '#0F0F13');
        document.documentElement.style.setProperty('--secondary-color', '#1A1C20');
        document.documentElement.style.setProperty('--font-color', '#FFFFFF');
        document.documentElement.style.setProperty('--font-light-color', '#9E9FA4');
    } 
    else {
        document.documentElement.style.setProperty('--primary-color', '#F8FAFB');
        document.documentElement.style.setProperty('--secondary-color', '#FFFFFF');
        document.documentElement.style.setProperty('--font-color', '#1B1D28');
        document.documentElement.style.setProperty('--font-light-color', '#9E9FA4');
    }

    LS.SetItem(LS.KEY_THEME, theme);
}

export { changeTheme, THEME_DARK, THEME_LIGHT }