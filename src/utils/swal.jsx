import Swal from "sweetalert2";
import "../../node_modules/sweetalert2/dist/sweetalert2.css"

export const swal = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
};
