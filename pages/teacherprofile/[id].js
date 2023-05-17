import Navbarr from "../components/Navbarr";
import BackButton from "../components/BackButton";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Table, Space } from "antd";
import moment from "moment";
import { Collapse } from 'antd';
import Notification from "../components/Notification";
export default function TeacherProfile() {
    const router = useRouter();
    const { id } = router.query;
    const [dataa, setData] = useState([]);
    const [datateacher, setDataTeacher] = useState([]);
    const [dataatable, setDatatable] = useState([]);
    const [subject, setSubject] = useState("");
    const [dataaa, setDataaa] = useState("")
    const [notification, setNotification] = useState({
        message: "",
        success: false,
    });
    const { Panel } = Collapse;
    useEffect(() => {
        if (!notification.message) return;

        const timer = setTimeout(() => {
            setNotification({
                message: "",
                success: false,
            });
        }, 3000);


        return () => clearTimeout(timer);
    }, [notification]);
    const fetchData = async () => {
        setSubject(localStorage.getItem("selectedCourse"));
        return fetch("https://diplomaback.vercel.app/api/teacherList")
            .then((response) => response.json())
            .then((data) => setData(data));
    };
    useEffect(() => {
        setDataaa(JSON.parse(localStorage.getItem("user")))
        fetchData();
    }, []);
    console.log(dataa);
    useEffect(() => {
        dataa.map((e, ind) => {
            // console.log(dataa);
            if (e._id === id) {
                console.log(e._id);
                setDataTeacher(e);
            }
        });
    }, [dataa]);
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            router.push("/");
        } else {
            //show validation message
        }
    });
    console.log(id);
    console.log(datateacher);
    console.log("datatable", dataatable);
    const age = moment().year() - datateacher.year;
    const handleClick = async (record) => {
        console.log(record);
        console.log(dataa);
        if (subject) {
            try {
                const response = await fetch("https://diplomaback.vercel.app/api/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        edate: moment(record.edate).utc().format("YYYY-MM-DD HH:mm"),
                        sdate: moment(record.sdate).utc().format("YYYY-MM-DD HH:mm"),
                        teacher: record.teacher,
                        datatable: record._id,
                        subject: subject,
                        user: dataaa._id,
                        userEmail: dataaa.email,
                        userPnum1: dataaa.pnum1,
                        userPnum2: dataaa.pnum2,
                        userName: dataaa.fname,
                        price: datateacher.price,
                        dateCreated: moment().format("YYYY-MM-DD HH:mm"),
                        link: "",

                    }),
                });
                const data = await response.json();
                if (data.status === "ok") {
                    router.push(`/checkout/${record._id}`)
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setNotification({
                message: "Хичээл сонгоогүй байна",
                success: false,
            });
        }

    }
    const columns = [
        {
            title: 'Эхлэх Цаг',
            dataIndex: 'sdate',
            key: 'sdate',
        },
        {
            title: 'Дуусах Цаг',
            dataIndex: 'edate',
            key: 'edate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button className=" text-700" onClick={() => (handleClick(record))}>Сонгох</button>
                </Space>
            ),
        },
    ];
    const onChange = (key) => {
        console.log(key);
    };
    console.log(datateacher)
    const filterDataa = (data) => {
        const fData = data.filter((i) => {
            return i.teacher === datateacher._id && i.isOrdered === "false";
        });

        console.log(fData);
        setDatatable(fData);
    };
    const fetchDataa = useCallback(async () => {
        const response = await fetch("https://diplomaback.vercel.app/api/timetableData");
        const data = await response.json();
        console.log(data);

        filterDataa(data);
    }, [datateacher]);

    useEffect(() => {
        if (datateacher) {
            fetchDataa();
        }
    }, [datateacher]);
    const handleClick1 = ((i) => {
        localStorage.setItem("selectedCourse", i)
        setNotification({
            message: "Амжилттай",
            success: true,
        });
    })
    return (
        <div>
            <Navbarr />
            <BackButton />
            <Notification
                message={notification.message}
                success={notification.success}
            />
            <div className="p-8 container flex justify-center mx-auto">
                <div className="p-8 bg-50 shadow mt-2">
                    <div className=" text-center border-b pb-12">
                        <h1 className="text-4xl font-medium text-gray-700">
                            {datateacher.fname} {datateacher.lname},
                            <span className="font-light text-gray-500">{age}</span>
                        </h1>
                    </div>
                    <div className="mt-10  border-b pb-12">
                        <p className="font-light text-gray-600 mt-3">Төгссөн сургууль: {datateacher.surguuli}</p>
                        <p className="mt-8 text-gray-500">
                            Хүйс: {datateacher.gender}
                        </p>
                        <p className="mt-2 text-gray-500">Аймаг/Хот: {datateacher.province}</p>
                    </div>
                    <div>
                        Заадаг хичээлүүд:
                        {datateacher.subject && datateacher.subject.map((i) => {
                            return <button className=" bg-1 m-4 rounded text-0" onClick={() => handleClick1(i)}>{i}</button>
                        })}
                    </div>
                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600 text-center font-light lg:px-16">
                            Товч намтар: {datateacher.tovchtaniltsuulga}
                        </p>
                    </div>
                    <Collapse defaultActiveKey={['1']} onChange={onChange} className="mt-8">
                        <Panel showArrow={false} header="Цагийн хуваарь харах" key="2">
                            <div className="p-8 bg-0 shadow">
                                <Table columns={columns} dataSource={dataatable} />
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>

        </div>
    );
};
