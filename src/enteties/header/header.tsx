import { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Switcher from '../../features/darkMode/switcher';
import { motion } from "framer-motion"
import { useLocation, useNavigate } from 'react-router';

const Header = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [modal, setModal] = useState(false)
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState("ru")
    function TranslateClick(lang: string) {
        i18n.changeLanguage(lang);
    }

    return (
        <div className="">
            <div style={{ boxShadow: "0px 0.1px 5px" }} className="w-full flex items-center justify-between px-8 p-4">
                <img src="../../../src/assets/Logo (1) 1 1.png" alt="" />
                <div className="flex gap-8 items-center">
                    {location.pathname == "/" && <div onClick={() => navigate("/login")} className="cursor-pointer flex gap-2 items-center text-2xl">
                        <img src="../../../src/assets/healthicons_ui-user-profile.png" alt="" />
                        <span>Admin</span>
                    </div>}
                    <Switcher />
                    {language == "ru" && <img onClick={() => setModal(true)} className="w-[50px] cursor-pointer rounded-full h-[50px]" src="../../../src/assets/Frame 1000004900.png" alt="" />}
                    {language == "en" && <img onClick={() => setModal(true)} className="w-[50px] cursor-pointer rounded-full h-[50px]" src="../../src/assets/A rounded USA flag on a white background, depicted in a distinct split futuristic sci-fi style. Advanced technology, space elements, divided sections, bold areas. .jpg" alt="" />}
                </div>
            </div>

            {
                modal && <motion.div initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, }} style={{ boxShadow: "0px 0.1px 5px" }} className="fixed top-7 right-7 bg-white py-2 px-4 rounded-lg shadow-lg">
                    <button className="text-black ml-18" onClick={() => setModal(false)}>&times;</button>
                    <button className="block p-2 px-4 rounded-lg mt-1 bg-emerald-500 hover:bg-emerald-700 text-white" onClick={() => {
                        TranslateClick('en')
                        setLanguage("en")
                        setModal(false)
                    }}>English</button>
                    <button className="block p-2 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-700 mt-4 text-white" onClick={() => {
                        TranslateClick('ru')
                        setLanguage("ru")
                        setModal(false)
                    }}>Russian</button>
                </motion.div>
            }
        </div >
    )
}

export default Header
