"use client";
import CreateAdminForm from "@/components/CreateAdmin/CreateAdmin";

const AdminCreationPage = () => {
  return (
    <div>
      <h1 className=" text-2xl m-10 text-center bg-white p-2 font-semibold rounded-2xl ">
        Criar Admin
      </h1>
      <CreateAdminForm />
    </div>
  );
};

export default AdminCreationPage;
