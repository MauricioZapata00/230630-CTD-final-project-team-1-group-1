import { Button, Dialog, DialogActions, Input } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { CheckCircle } from "@mui/icons-material";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { getProductDetail, submitBookings } from "../../../services";

const FormBooking = () => {
  const { error, setError, logedUser, selectedDate } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [productDetail, setProductDetail] = useState()
  const navigateTo = useNavigate();
  const params = useParams()

console.log(params.id);
    useEffect(() => {
        getProductDetail(params.id)
            .then((response) => {
                setProductDetail(response.data);
                console.log('hola');
            })
            .catch((error) => {
                const errorMsg = error?.response?.data?.description;
                setError(errorMsg || "Ha ocurrido un error.");
            })

    }, [id, setError]);


    const [bookingData, setBookingData] = useState({
        idProducto: productDetail.id,
        emailUsuario: logedUser.email,
        producto: productDetail.nombre,
        valorReserva: productDetail.precio,
        fechaReserva: selectedDate.format("YYYY-MM-DD")
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckBooking = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEditBooking = () => {
        handleCloseModal();
    };

    const handleConfirmBooking = (data) => {
        setShowModalConfirm(true);
        submitBookings(bookingData, logedUser.jwt)
            .then(() => {
                console.log("reservan enviada:", bookingData);
            })
            .catch((error) => {
                const errorMsg = error?.response?.data?.description;
                setError(errorMsg || "Ha ocurrido un error.");
            });
    };
    const handleNavigate = () => {
        navigateTo("/reservas");
    };

    return (
        <>
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
                        <Input fullWidth type="text" value={bookingData.emailUsuario} />
                    </p>
                    <h4>Datos del producto</h4>
                    <p>
                        <label>Nombre</label>
                        <Input fullWidth type="text" value={productDetail.nombre} />
                    </p>
                    <p>
                        <label>Precio</label>{" "}
                        <Input fullWidth type="text" readOnly={true} onChange={handleInputChange} value={bookingData.valorReserva} />
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
                        <Input fullWidth type="date" onChange={handleInputChange} value={bookingData.fechaReserva} />
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
        </>
    );
};
export default FormBooking;
