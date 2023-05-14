import Navbarr from "../components/Navbarr";
import Footer from "../components/Footer";
import { Button, Form, Input, InputNumber } from "antd";
import { Select, Space } from "antd";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Router, { useRouter } from "next/router";
import Notification from "../components/Notification";
import jwt from "jsonwebtoken";
import PageWrapper from "../components/page-warapper";
const FormStudent = () => {
  const router = useRouter();
  const [userrr, setUserrr] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    success: false,
  });

  useEffect(() => {
    setUserrr(JSON.parse(localStorage.getItem("user")));
  }, []);
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
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const user = jwt.decode(token);
    console.log(user);
    try {
      const res = await fetch(`diplomaback.vercel.app/api/userData/${userrr._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userrr),
      });
      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(userrr));
      setNotification({
        message: "Амжилттай",
        success: true,
      });
      return updatedUser;
    } catch (error) {
      setNotification({
        message: "Алдаа гарлаа",
        success: false,
      });
      console.error(error);
      return null;
    }
  };
  return (
    <div>
      <Navbarr />
      <Notification
        message={notification.message}
        success={notification.success}
      />
      <PageWrapper>
        <section className=" py-1 bg-blueGray-50">
          <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
              <div className="rounded-t bg-0 mb-0 px-6 py-6">
                <div className="text-center flex justify-between">
                  <h6 className="text-blueGray-700 text-xl font-bold">
                    Миний хаяг
                  </h6>
                  <button
                    className="bg-1 text-0 active:bg-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Хадгалах
                  </button>
                  <button
                    className="bg-500 text-0 active:bg-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => Router.back()}
                  >
                    back
                  </button>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Хэрэглэгчийн мэдээлэл
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Нэр
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.fname}
                          onChange={(e) => setUserrr({ ...userrr, fname: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Овог
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.lname}
                          onChange={(e) => setUserrr({ ...userrr, lname: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Утасны дугаар 1
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-1000 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.pnum1}
                          onChange={(e) => setUserrr({ ...userrr, pnum1: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Утасны дугаар 2
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.pnum2}
                          onChange={(e) => setUserrr({ ...userrr, pnum2: e.target.value })}
                        />
                      </div>
                    </div>

                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />

                  <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Contact Information
                  </h6>
                  <div className="flex flex-wrap">
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Аймаг/Хот
                        </label>
                        <select
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.province}
                          onChange={(e) => setUserrr({ ...userrr, province: e.target.value })}
                        >
                          <option value="null">{userrr.province}</option>
                          <option value="Улаанбаатар">Улаанбаатар</option>
                          <option value="Архангай">Архангай</option>
                          <option value="Баян-Өлгий">Баян-Өлгий</option>
                          <option value="Баянхонгор">Баянхонгор</option>
                          <option value="Булган">Булган</option>
                          <option value="Говь-Алтай">Говь-Алтай</option>
                          <option value="Говьсүмбэр">Говьсүмбэр</option>
                          <option value="Дархан-Уул">Дархан-Уул</option>
                          <option value="Дорноговь">Дорноговь</option>
                          <option value="Дорнод">Дорнод</option>
                          <option value="Дундговь">Дундговь</option>
                          <option value="Завхан">Завхан</option>
                          <option value="Орхон">Орхон</option>
                          <option value="Өвөрхангай">Өвөрхангай</option>
                          <option value="Өмнөговь">Өмнөговь</option>
                          <option value="Сүхбаатар">Сүхбаатар</option>
                          <option value="Сэлэнгэ">Сэлэнгэ</option>
                          <option value="	Төв"> Төв</option>
                          <option value="Увс">Увс</option>
                          <option value="Ховд">Ховд</option>
                          <option value="Хөвсгөл">Хөвсгөл</option>
                          <option value="Хэнтий">Хэнтий</option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          баг/хороо
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.bag}
                          onChange={(e) => setUserrr({ ...userrr, bag: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          сум/дүүрэг
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.sum}
                          onChange={(e) => setUserrr({ ...userrr, sum: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-12/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Дэлгэрэнгүй хаяг
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.delgerengui}
                          onChange={(e) => setUserrr({ ...userrr, delgerengui: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Хүйс
                      </label>
                      <input
                        className=""
                        type="radio"
                        value="male"
                        onChange={(e) => setUserrr({ ...userrr, gender: e.target.value })}
                        name="gender"
                      />
                      Эр
                      <input
                        className="ml-6"
                        type="radio"
                        value="female"
                        onChange={(e) => setUserrr({ ...userrr, gender: e.target.value })}
                        name="gender"
                      />
                      Эм
                    </div>
                    <div className="w-full lg:w-3/12 px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Төрсөн он сар өдөр
                        </label>
                        <input
                          type="text"
                          className="inputDate"
                          defaultValue={userrr.year}
                          placeholder="Он"
                          onChange={(e) => setUserrr({ ...userrr, year: e.target.value })}
                          id="Year"
                          name="Year"
                          required
                          pattern="[0-9]+$"
                        />
                        <input
                          type="text"
                          className="inputDate"
                          placeholder="Сар"
                          defaultValue={userrr.month}
                          onChange={(e) => setUserrr({ ...userrr, month: e.target.value })}
                          id="month"
                          name="month"
                          required
                          pattern="[0-9]+$"
                        />
                        <input
                          type="text"
                          className="inputDate"
                          placeholder="Өдөр"
                          defaultValue={userrr.day}
                          onChange={(e) => setUserrr({ ...userrr, day: e.target.value })}
                          id="day"
                          name="day"
                          required
                          pattern="[0-9]+$"
                        />
                      </div>
                    </div>
                    <div className=" w-32 lg:w-3/12 px-4">
                      <div className="relative w-32 mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Анги
                        </label>
                        <select
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-0 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          defaultValue={userrr.angi}
                          onChange={(e) => setUserrr({ ...userrr, angi: e.target.value })}
                        >
                          <option value="null">-Сонгох-</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </form>
              </div>
            </div>
            <footer className="relative  pt-8 pb-6 mt-2">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                  <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
                </div>
              </div>
            </footer>
          </div>
        </section>
      </PageWrapper>
      <Footer />
    </div>
  );
};

export default FormStudent;
