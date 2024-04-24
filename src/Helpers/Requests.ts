import axios from "axios";
import dotenv from "dotenv";
import * as fs from "fs";


interface LoginData {
    stay_logged_in: number;
    action: string;
    referer: string;
    email: string;
    password: string;
    md5password: string;
}

dotenv.config();

const loginFormData: LoginData = {
    stay_logged_in: 1,
    action: "login",
    referer: "https://app.squashlevels.com/",
    email: process.env.SQUASHLEVELS_USER as string,
    password: "Use MD5",
    md5password: process.env.SQUASHLEVELS_PASSWORD_MD5 as string
};

//get Login Page to get cookies
const getLoginPage = async (): Promise<string[]> => {
    const response = await axios.get('https://app.squashlevels.com/dashboard');
    const cookie = (response.headers['set-cookie'] as string[]);
    return cookie;
}

//login to site
const login = async (): Promise<string[]> => {

    fs.access(".env", fs.constants.F_OK, (err) => {
        if (err) {
            throw new Error(".env file does not exist in root dir. Please create this.");
        }
    })

    const response = await axios.post(
        'https://api.leveltech.squashlevels.com/api/classic/menu_login',
        loginFormData,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': await getLoginPage()

            }
        });
    if (response.data.includes("var userName = 'none'")) {
        throw new Error('Login was not successful, is your .env set correctly?')
    }
    const cookie = (response.headers['set-cookie'] as string[]);
    return cookie;
};

//get player details page and return body
export const getPlayerDetails = async (): Promise<string> => {
    const response = await axios.get('https://api.leveltech.squashlevels.com/api/classic/player_detail',
        {
            headers: {
                'Cookie': await login()
            }
        });
    return response.data;

};