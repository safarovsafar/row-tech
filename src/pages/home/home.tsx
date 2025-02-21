import { useTranslation } from 'react-i18next';
import Aside from '../../enteties/sidebar/aside'
import Table from '../../enteties/table/table';
import { useState } from 'react';
import Modal from '../../enteties/modal/modal';

const Home = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className='flex gap-[50px]'>
            <Aside />
            <div className="p-[20px] w-[90%]">
                <p className="text-3xl font-semibold">{t("text.9")} Row Messaging Hub</p>
                <button onClick={() => setIsOpen(true)} className='block lg:hidden mt-2 p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg'>Settings</button>
                <Table />
            </div>

            <Modal isOpen={isOpen} onClose={setIsOpen}>
                <div className="flex text-black cursor-pointer px-8 gap-4 text-2xl">
                    <img src="../../../src/assets/ooui_view-details-ltr.png" alt="" />
                    <span>{t("text.5")}</span>
                </div>

                <div className="flex gap-4 text-2xl text-black px-8 cursor-pointer mt-6">
                    <img src="../../../src/assets/material-symbols_finance-sharp.png" alt="" />
                    <span>{t("text.6")}</span>
                </div>

                <div className="flex gap-4 text-2xl mt-6 px-8 text-black cursor-pointer">
                    <img src="../../../src/assets/icomoon-free_hammer2.png" alt="" />
                    <span>{t("text.7")}</span>
                </div>

                <div className="flex gap-4 text-2xl mt-6 px-8 text-black cursor-pointer">
                    <img src="../../../src/assets/weui_setting-filled.png" alt="" />
                    <span>{t("text.8")}</span>
                </div>
            </Modal>
        </div>
    )
}

export default Home
