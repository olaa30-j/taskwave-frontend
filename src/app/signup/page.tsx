/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { createUserService } from "../_lib/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface IUser {
  userImage: File;
  username: string;
  email: string;
  password: string;
}

const Page = () => {
  const router = useRouter();
  const [fileImage, setFileImage] = useState<File | undefined>(undefined);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    userImage: Yup.mixed<File>().required("A user image file is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    setValue,
    watch,
  } = useForm<IUser>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      userImage: undefined,
    },
  });

  const image = watch("userImage");

  // Handle form submission
  const onSubmit = async (data: IUser) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("username", data.username);
      if (fileImage && fileImage instanceof File) {
        formData.append("userImage", fileImage);
      } else {
        console.log("Image is missing or not a valid file.");
      }
      try {
        const user = await createUserService(formData);
        if (user){
          Swal.fire({
            icon: 'success',
            title: 'Created New Account!',
            text: 'You have successfully created new account.',
            timer: 2000,
            backdrop: `
              rgba(0,0,123,0.4)
              url("/success.gif")
              left top
              no-repeat
            `,
            showConfirmButton: false
        });
        router.replace('/home/dashboard'); 
        }
      } catch (error: any) {
        console.error("Task creation error:", error.response?.data?.message || "Task creation failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 w-10/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md lg:max-w-sm mx-auto my-4">
              <div className="mt-2 mb-8">
                <h3 className="text-gray-800 text-3xl font-bold">
                  Welcome to Task Wave,{" "}
                  <span className="text-2xl font-extrabold text-blue-600">Sign up</span>
                </h3>
                <p className="text-gray-800 text-sm mt-6">
                  have an account{" "}
                  <Link href="login" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">
                    sign in here
                  </Link>
                </p>
              </div>

              {/* Email Input */}
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {/* Email Icon */}
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1l-8 4.5L2 5V4Zm16 2.32V16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6.32l8 4.5 8-4.5Z" />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`${
                    touchedFields.email && errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-none rounded-e-lg bg-gray-50 border text-gray-900 text-sm flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Email"
                />
              </div>
              {touchedFields.email && errors.email && <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>}

              {/* Username Input */}
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {/* Username Icon */}
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="username"
                  {...register("username")}
                  className={`${
                    touchedFields.username && errors.username ? "border-red-500" : "border-gray-300"
                  } rounded-none rounded-e-lg bg-gray-50 border text-gray-900 text-sm flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Username"
                />
              </div>
              {touchedFields.username && errors.username && <p className="text-red-500 text-xs mb-2">{errors.username.message}</p>}

              {/* Password Input */}
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="flex mb-4">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {/* Password Icon */}
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a5 5 0 0 0-5 5v3H4a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2h-1V7a5 5 0 0 0-5-5Zm-3 8V7a3 3 0 0 1 6 0v3Z" />
                    <path d="M8 14a2 2 0 0 0 4 0v-1H8v1Z" />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`${
                    touchedFields.password && errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-none rounded-e-lg bg-gray-50 border text-gray-900 text-sm flex-1 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Password"
                />
              </div>
              {touchedFields.password && errors.password && <p className="text-red-500 text-xs mb-2">{errors.password.message}</p>}

              {/* Image Input */}
              <label htmlFor="userImage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                User Image
              </label>
              <div className="flex mb-4">
                <input
                  type="file"
                  id="userImage"
                  accept="image/*"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files && event.target.files.length > 0) {
                      const file = event.target.files[0] as File;
                      setValue('userImage', file);
                      setFileImage(file)
                    }
                  }}
                  className="block w-full border border-gray-300 rounded-md focus:ring-blue-500"
                  />
              </div>
              {errors.userImage && <p className="text-red-500 text-xs mb-2">{errors.userImage.message}</p>}
              {/* Display Image Preview */}
              {image && image instanceof File && (
              <div className="mt-4">
                <p className="text-sm text-gray-700">Selected Image:</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Create new account
              </button>
            </form>
          </div>

          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 hidden md:block">
            <img
              src="https://i.pinimg.com/originals/aa/f8/86/aaf8864c0d47f6e04635159fcf04a680.gif"
              className="w-full"
              alt="Sample"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
