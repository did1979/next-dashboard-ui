"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long!",
  }),
  firstName: z.string().min(1, {
    message: "First name is required!",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required!",
  }),
  phone: z.string().min(1, {
    message: "Phone is required!",
  }),
  address: z.string().min(1, {
    message: "Address is required!",
  }),
  bloodType: z.string().min(1, {
    message: "Blood type is required!",
  }),
  dateOfBirth: z.date({
    message: "date Of Birth is required!",
  }),
  sex: z.enum(["male", "female"], { message: "Sex is required!" }),
  img: z.instanceof(File, { message: "Image is required!" }),
});

type Inputs = z.infer<typeof schema>;
const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update" | "delete";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold first-letter:uppercase">{`${type} a parent`}</h1>
      <span className="text-sm text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors.username}
        />
        <InputField
          label="Email"
          register={register}
          name="email"
          defaultValue={data?.email}
          error={errors.email}
        />
        <InputField
          label="Password"
          register={register}
          name="password"
          type="password"
          defaultValue={data?.password}
          error={errors.password}
        />
      </div>
      <span className="text-sm text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          register={register}
          name="firstName"
          defaultValue={data?.firstName}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          register={register}
          name="lastName"
          defaultValue={data?.lastName}
          error={errors.lastName}
        />
        <InputField
          label="Phone"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors.phone}
        />
        <InputField
          label="Address"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          register={register}
          name="dateOfBirth"
          type="date"
          defaultValue={data?.dateOfBirth}
          error={errors.dateOfBirth}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-sm text-gray-400">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-sm text-red-400">
              {errors.sex?.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label
            className="text-sm text-gray-400 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="upload" width={28} height={28} />
            <span className="">Upload a photo</span>
          </label>
          <input id="img" type="file" {...register("img")} className="hidden" />
          {errors.img?.message && (
            <p className="text-sm text-red-400">
              {errors.img?.message.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
