import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeachersList from "../components/TeachersList";
import CategoryList from "../components/CategoryList";
import ScheduleList from "../components/ScheduleList";
import Navbarr from "../components/Navbarr";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PageWrapper from "../components/page-warapper";
const SubjectDetails = () => {

  const router = useRouter();
  const { subjectdetails } = router.query;
  const [dataa, setData] = useState([]);
  // const teacherlist = [];
  // teacherlist.push(JSON.parse(localStorage.getItem("FilteredTeacher")));
  // console.log(JSON.parse(localStorage.getItem("FilteredTeacher")));
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/");
    } else {
      setData(JSON.parse(localStorage.getItem("FilteredTeachers")))
    }
  });
  // const fetchData = async () => {
  //   return fetch("https://diplomaback.vercel.app/api/teacherListBySubjects",)
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <div>
      <Head>
        <title>E-Teacher</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbarr></Navbarr>
      <PageWrapper>
        <BackButton />
        <h1 className="relative xl:text-4xl text-3xl text-center text-gray-800  font-extrabold pb-6 sm:w-4/6 w-5/6 mx-auto pt-4 z-10">
          {subjectdetails}
        </h1>
        {dataa.map((i, ind) => {
          return (
            <div
              role="listitem"
              className="  xl:w-1/3 sm:w-3/4 md:w-2/5 relative mt-16 mb-32 sm:mb-24 xl:max-w-sm lg:w-2/5"
            >
              <div className="bg-50 rounded overflow-hidden shadow-md  dark:bg-gray-900">

                <div className=" px-6 mt-16 pb-10">
                  <button
                    className="mx-auto block font-bold dark:text-white text-2xl text-center mb-1"
                    key={i._id}
                    onClick={(e) => { localStorage.setItem("teachername", i.fname); router.push(`/teacherprofile/${i._id}`) }}
                  >
                    {i.fname} {i.lname}
                  </button>
                  <p className=" text-700 text-xl text-center font-bold">
                    {i.price}₮
                  </p>
                  <p className="text-center text-gray-600 dark:text-gray-200 text-base pt-3 font-normal">
                    {i.tovchtaniltsuulga}
                  </p>


                </div>
              </div>
            </div>
          );
        })}
      </PageWrapper>
    </div>
  );
};

export default SubjectDetails;
