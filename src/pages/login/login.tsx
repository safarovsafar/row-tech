import axios from "axios";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import Header from "../../enteties/header/header";
import { motion } from "framer-motion"

const Login = () => {
    const { t } = useTranslation();
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const navigate = useNavigate()

    async function loginFunc(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const obj = {
            userLogin: name,
            password: password
        }
        try {
            const res = await axios.post(`https://row-sms.azurewebsites.net/Auth/login`, obj)
            console.log(res);
            if (res.status == 200) {
                localStorage.setItem("access_token", res.data.accessToken)
                localStorage.setItem("userName", name)
                localStorage.getItem("access_token") ? navigate("/") : setError(true)
            }

        } catch (error) {
            console.error(error);
            setError(true)
        }
    }

    return (
        <div className="dark:bg-black dark:text-white">
            <Header />
            <motion.div initial={{ opacity: 0, y: -70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} className="w-[100%] h-[100vh] flex items-center justify-center">
                <div style={{ boxShadow: "0px 0.1px 5px" }} className="m-auto mt-[150px] text-center p-4 py-8 w-[400px] rounded-lg">
                    <img className="ml-[130px]" src="../../../src/assets/Logo (1) 1 1.png" alt="" />
                    <form onSubmit={(e) => loginFunc(e)}>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="block border rounded-lg p-2 w-full h-[40px] mt-[25px]" placeholder={t("text.2")} />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="block border rounded-lg p-2 w-full h-[40px] mt-[25px]" placeholder={t("text.3")} />
                        <button type="submit" className="block text-white rounded-lg p-2 w-full h-[40px] mt-[25px] bg-emerald-600 cursor-pointer hover:bg-emerald-700">{t("text.1")}</button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-2">{t("text.4")}</p>}
                </div>
            </motion.div>
        </div>
    )
}

export default Login
