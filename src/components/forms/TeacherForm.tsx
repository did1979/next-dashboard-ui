"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address !" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long!",
  }),
  firstName: z.string().min(1, {
    message: "First name is required !",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required !",
  }),
  phone: z.string().min(1, {
    message: "Phone is required !",
  }),
  address: z.string().min(1, {
    message: "Address is required !",
  }),
  birthday: z.date({
    message: "Birthday is required !",
  }),
  sex: z.enum(["male", "female"], { message: "Sex is required !" }),
  img: z.instanceof(File, { message: "Image is required !" }),
});

type Inputs = z.infer<typeof schema>;
const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
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
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-sm text-gray-400 font-medium">
        Authentication Information
      </span>
      <InputField
        label="Username"
        register={register}
        name="username"
        defaultValue={data?.username}
        error={errors.username}
      />
      <span className="text-sm text-gray-400 font-medium">
        Personal Information
      </span>
      <button className="bg-blue-400 text-white rounded-md p-2">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
