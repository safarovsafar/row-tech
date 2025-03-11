import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion"
import Modal from '../modal/modal';
import { axiosRequest } from '../../shared/utils/axiosRequest'
import { getToken } from '../../shared/utils/token';
import { useNavigate } from 'react-router';

const Table = () => {

    const [data, setData] = useState([])
    const [response, setResponse] = useState([])
    const [recip, setResip] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [start, setStart] = useState<number>(0)
    const [finish, setFinish] = useState<number>(8)
    const [change, setChange] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<boolean>(false)
    const [idx, setIdx] = useState("")
    const { t } = useTranslation();
    const navigate=useNavigate()

    const get = async () => {
        if(localStorage.getItem("access_token") === null){
           navigate("/login")
        } 
        try {
            const { data } = await axiosRequest.post(`/api/Messages/search`, {
                "filters": {
                    "sentAt": "2025-02-20T13:46:28.788Z",
                    "startDate": "2024-10-20T00:46:28.788Z",
                    "endDate": "2025-10-20T13:46:28.788Z"
                },
                "orderBy": {
                    "orderColumn": 1,
                    "direction": 0
                },
                "pageInfo": {
                    "pageNumber": 1,
                    "pageSize": 100
                }
            })
            setData(data.items)
            setResponse(data.items.slice(0, 8))
        } catch (error) {
        }
    }


    useEffect(() => {
        get()
    }, [])

    async function deletFunc(obj: any) {
        try {
            await axiosRequest.post(`/api/Messages/delete`, obj,)
            get()
        } catch (error) {
            console.error(error);
        }
    }

    async function addFunc(e: any) {
        e.preventDefault()
        const obj = {
            messageType: Number(e.target["message"].value),
            "items": [
                {
                    "recipient": e.target["recipient"].value,
                    "content": e.target["content"].value
                }
            ]
        }
        try {
            await axiosRequest.post(`/api/Messages/listCreate`, obj)
            get()
        } catch (error) {
            console.error(error);
        }
        setAddModal(false)
        e.target.reset()
    }

    async function editFunc(e: any) {
        e.preventDefault()
        const obj = {
            id: Number(idx),
            recipient: recip,
            content: content
        }
        try {
            await axiosRequest.post(`/api/Messages/update`, obj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json"
                }
            })
            get()
        } catch (error) {
            console.error(error);
        }
        setEditModal(false)
    }

    function nextFunc() {
        if (data.length >= finish) {
            setStart(start + 8)
            setFinish(finish + 8)
            setResponse(data.slice(start, finish))
        }
    }
    function prevFunc() {
        if (start >= 8) {
            setStart(start - 8)
            setFinish(finish - 8)
            setResponse(data.slice(start, finish))
        }
    }

    return (
        <div style={{ boxShadow: "0.1px 0.1px 3px" }} className="mt-6 p-4 rounded-md w-full overflow-x-auto">
            <div className="flex px-4 justify-between items-center flex-wrap">
                <p className='text-2xl sm:text-3xl font-semibold'>{t("text.10")}</p>
                <button onClick={() => setAddModal(true)} className='bg-emerald-500 hover:bg-emerald-600 cursor-pointer p-2 px-4 text-white rounded-lg text-lg sm:text-xl mt-2 sm:mt-0'>+Add</button>
            </div>
            <div className="overflow-x-auto">
                <table className='w-full min-w-[600px] mt-4'>
                    <thead className='bg-emerald-400 text-lg sm:text-xl hover:bg-emerald-500 text-white'>
                        <tr>
                            <th className='p-2'>Id</th>
                            <th className='p-2'>Content</th>
                            <th className='p-2'>Organization</th>
                            <th className='p-2'>Recipient</th>
                            <th className='p-2'>Date</th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-lg sm:text-xl'>
                        {response.map((e: any, i: number) => (
                            <tr className='p-4 border-b border-black text-center' key={i}>
                                <td className='p-2'>{e.id}</td>
                                <td className='p-2'>{e.content}</td>
                                <td className='p-2'>{e.organization.value}</td>
                                <td className='p-2'>{e.recipient}</td>
                                <td className='p-2'>{e.sentAt.substring(0, 10)}</td>
                                <td className='p-2'><button onClick={() => {
                                    setChange(true);
                                    setIdx(e.id);
                                    setResip(e.recipient);
                                    setContent(e.content);
                                }} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-2"><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-2 flex justify-center gap-4">
                <button onClick={() => prevFunc()} className='font-bold cursor-pointer border rounded-lg p-2'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg></button>
                <button onClick={() => nextFunc()} className='font-bold cursor-pointer border rounded-lg p-2'><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></button>
            </div>

            {change && <motion.div initial={{ opacity: 0, scale: 0.5 }}
                animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} style={{ boxShadow: "0.1px 0.1px 5px" }} className='p-4 rounded-lg bg-white fixed text-black top-[380px] right-[300px]'>
                <button onClick={() => setChange(false)} className='absolute text-xl top-0 cursor-pointer right-2'>&times;</button>
                <button onClick={() => {
                    deletFunc({ id: idx })
                    setChange(false)
                }} className='px-2 py-1 w-[90px] cursor-pointer text-xl mt-2 block bg-red-500 hover:bg-red-700 rounded-md text-white'>Delete</button>
                <button onClick={() => {
                    setChange(false)
                    setEditModal(true)
                }} className='px-2 py-1 w-[90px] cursor-pointer text-xl mt-2 block bg-emerald-500 hover:bg-emerald-600 rounded-md text-white'>Edit</button>
            </motion.div>}

            <Modal isOpen={addModal} onClose={setAddModal}>
                <form onSubmit={addFunc} className='text-black'>
                    <input name='message' className='block border placeholder:text-gray-400 border-black rounded-lg p-2 w-full h-[40px] mt-[17px]' type="number" placeholder='MessageType' />
                    <input name='recipient' className='block border rounded-lg border-black p-2 w-full h-[40px] mt-[17px]' type="text" placeholder='Recipient' />
                    <input name='content' className='block border rounded-lg p-2 w-full border-black h-[40px] mt-[17px]' type="text" placeholder='Content' />
                    <button type='submit' className='bg-emerald-500 hover:bg-emerald-700 rounded-lg p-2 w-full h-[40px] mt-[17px] text-white'>Add message</button>
                </form>
            </Modal>

            <Modal isOpen={editModal} onClose={setEditModal}>
                <form onSubmit={editFunc} className='text-black'>
                    <input value={recip} onChange={(e) => setResip(e.target.value)} name='recipient' className='block border rounded-lg border-black p-2 w-full h-[40px] mt-[17px]' type="text" placeholder='Recipient' />
                    <input value={content} onChange={(e) => setContent(e.target.value)} name='content' className='block border rounded-lg p-2 w-full border-black h-[40px] mt-[17px]' type="text" placeholder='Content' />
                    <button type='submit' className='bg-emerald-500 hover:bg-emerald-700 rounded-lg p-2 w-full h-[40px] mt-[17px] text-white'>Edit message</button>
                </form>
            </Modal>
        </div>

    )
}

export default Table
