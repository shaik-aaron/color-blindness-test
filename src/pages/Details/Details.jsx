import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./details.css";

function Details() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate("/test", { state: { ...data } });
  };

  return (
    <div className="spacing">
      <h1 style={{ fontSize: "26px", marginTop: "86px" }}>Enter Details</h1>
      <form style={{ marginTop: "24px" }} onSubmit={handleSubmit(onSubmit)}>
        <p className="label">Name</p>
        <input {...register("name")} className="input" type="text" />
        <p style={{ marginTop: "18px" }} className="label">
          Age
        </p>
        <input {...register("age")} className="input" type="number" />
        <div className="flex">
          <div></div>
          <input className="submit" type="submit" value="Take Test" />
        </div>
      </form>
    </div>
  );
}

export default Details;
