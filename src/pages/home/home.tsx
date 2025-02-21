import { useTranslation } from 'react-i18next';
import Aside from '../../enteties/sidebar/aside'
import Table from '../../enteties/table/table';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className='flex gap-[50px]'>
            <Aside />
            <div className="p-[20px]">
                <p className="text-3xl font-semibold">{t("text.9")} Row Messaging Hub</p>
                <Table />
            </div>
        </div>
    )
}

export default Home
