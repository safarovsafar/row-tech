import { useTranslation } from "react-i18next";


const Aside = () => {
    const { t } = useTranslation();
    return (
        <div className='flex gap-[100px] font-normal dark:bg-black text-white'>
            <aside className='hidden lg:block w-[300px] p-4 pt-10 pl-6 h-[89vh] bg-black border'>
                <div className="flex cursor-pointer gap-4 text-2xl">
                    <img src="../../../src/assets/ooui_view-details-ltr.png" alt="" />
                    <span>{t("text.5")}</span>
                </div>

                <div className="flex gap-4 text-2xl cursor-pointer mt-6">
                    <img src="../../../src/assets/material-symbols_finance-sharp.png" alt="" />
                    <span>{t("text.6")}</span>
                </div>

                <div className="flex gap-4 text-2xl mt-6 cursor-pointer">
                    <img src="../../../src/assets/icomoon-free_hammer2.png" alt="" />
                    <span>{t("text.7")}</span>
                </div>

                <div className="flex gap-4 text-2xl mt-6 cursor-pointer">
                    <img src="../../../src/assets/weui_setting-filled.png" alt="" />
                    <span>{t("text.8")}</span>
                </div>
            </aside>
        </div>

    )
}

export default Aside