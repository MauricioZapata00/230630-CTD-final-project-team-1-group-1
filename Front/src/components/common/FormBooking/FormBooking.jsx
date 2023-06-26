import { Button, Dialog, DialogActions, Input } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";
import { CheckCircle } from "@mui/icons-material";
import { RiCheckboxCircleLine } from "react-icons/ri";

const FormBooking = ({ productDetail }) => {
  const { error, setError, logedUser } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [productDetaile] = useState(productDetail);
  const navigateTo = useNavigate();
  console.log(productDetaile);
  const handleCheckBooking = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditBooking = () => {
    handleCloseModal();
  };

  const handleConfirmBooking = () => {
    setShowModalConfirm(true);
  };
  const handleNavigate = () => {
    navigateTo("/reservas");
  };

  return (
    <div className="user-page">
      <div className="user-page__info" style={{ height: "90%", width: "60vw" }}>
        <h2>DETALLE DE LA RESERVA</h2>
        <h4>Datos personales</h4>
        <p>
          <label>Nombre</label>
          <Input fullWidth type="text" value={logedUser.nombre} />
        </p>
        <p>
          <label>Apellido</label>{" "}
          <Input fullWidth type="text" value={logedUser.apellido} />
        </p>
        <p>
          <label>Email</label>
          <Input fullWidth type="text" value={logedUser.email} />
        </p>
        <h4>Datos del producto</h4>
        <p>
          <label>Nombre</label>
          <Input fullWidth type="text" value={productDetaile} />
        </p>
        <p>
          <label>Precio</label>{" "}
          <Input fullWidth type="text" value={productDetaile} />
        </p>
        <p>
          <label>Cantidad</label>
          <Input
            fullWidth
            type="text"
            disabled={true}
            readOnly={true}
            value={1}
          />
        </p>
        <h4>Datos de la reserva</h4>
        <p>
          <label>Fecha</label>
          <Input fullWidth type="date" value={"2000-02-02"} />
        </p>
        <div
          style={{
            margin: "1.5rem 0 1rem 0",
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Button onClick={(goBack) => navigateTo(-1)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCheckBooking}>
            Confirmar reserva
          </Button>
        </div>
      </div>
      {showModal && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button style={{ fontWeight: "600" }} onClick={handleCloseModal}>
              X
            </Button>
          </DialogActions>
          <div
            className="calification"
            style={{ fontWeight: "600", paddingTop: "1rem" }}
          >
            <p style={{ fontWeight: "600" }}>
              ¿Estás seguro/a de que deseas realizar la reserva?
            </p>
          </div>
          <DialogActions
            style={{ justifyContent: "center", marginBottom: "1rem" }}
          >
            <Button onClick={handleEditBooking}>Editar Datos</Button>
            <Button variant="contained" onClick={handleConfirmBooking}>
              Confirmar reserva
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showModalConfirm && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button style={{ fontWeight: "600" }} onClick={handleCloseModal}>
              X
            </Button>
          </DialogActions>
          <div className="calification">
            <RiCheckboxCircleLine className="check-icon" />
            <p style={{ fontWeight: "600" }}>¡Muchas gracias!</p>
            <p> Su reserva se ha realizado exitosamente.</p>
          </div>
          <DialogActions
            style={{ justifyContent: "center", marginBottom: "1rem" }}
          >
            <Button variant="contained" onClick={handleNavigate}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};
export default FormBooking;
