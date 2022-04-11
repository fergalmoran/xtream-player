import React from "react";
import { Input, Label, Button, HelperText } from "./widgets";
import { useForm } from "react-hook-form";
import { BiRocket } from "react-icons/bi";
import { ApiService } from "../services";
import { toast } from "react-toastify";

const ServerDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    console.log("server-details.component", "onSubmit", errors);
    const validated = await ApiService.validateCredentials(
      data.server,
      data.username,
      data.password
    );
    if (validated) {
      localStorage.setItem("server", JSON.stringify(data));
      window.location.reload();
    } else {
      toast.error("FUCK YOU INVALID CREDENTIALS");
    }
  };
  return (
    <div className="w-full">
      <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
        XTream Codes Details
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />

        <Label>
          <span>Server address</span>
          <Input
            className="mt-1"
            type="text"
            placeholder="my.streams.com"
            autoComplete="off"
            {...register("server", {
              required: "Server is required",
            })}
            valid={!errors.server}
          />
          {errors.server && (
            <HelperText valid={false}>{errors.server.message}</HelperText>
          )}
        </Label>
        <Label className="mt-4">
          <span>Username</span>
          <Input
            className="mt-1"
            type="text"
            placeholder="username"
            autoComplete="off"
            data-lpignore="true"
            {...register("username", {
              required: "Username is required",
            })}
            valid={!errors.username}
          />
          {errors.username && (
            <HelperText valid={false}>{errors.username.message}</HelperText>
          )}{" "}
        </Label>
        <Label className="mt-4">
          <span>Password</span>
          <Input
            className="mt-1"
            type="password"
            autoComplete="off"
            data-lpignore="true"
            placeholder="***************"
            {...register("password", {
              required: "Password is required",
            })}
            valid={!errors.password}
          />
          {errors.password && (
            <HelperText valid={false}>{errors.password.message}</HelperText>
          )}
        </Label>

        <Button
          className="mt-4"
          block
          type="submit"
          aria-label="Submit"
          icon={BiRocket}
        >
          Let's go!
        </Button>
        <hr className="my-8" />
      </form>
    </div>
  );
};

export default ServerDetails;
