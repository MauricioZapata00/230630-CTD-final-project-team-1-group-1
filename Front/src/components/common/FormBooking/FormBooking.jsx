import { Button, Dialog, DialogActions, Input, Grow, Slide } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { getProductDetail, submitBookings } from "../../../services";
import Check from "../../../assets/check.png";

const FormBooking = () => {
    const { error, setError, logedUser, selectedDate } = useContext(AppContext);
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [productDetail, setProductDetail] = useState(null)
    const navigateTo = useNavigate();
    const params = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bookingData, setBookingData] = useState({
        idProducto: "",
        emailUsuario: "",
        producto: "",
        valorReserva: "",
        fechaReserva: selectedDate?.format("YYYY-MM-DD") || ""
    });

    useEffect(() => {
        const logedUserData = localStorage.getItem("logedUser");
        if (logedUserData) {
            const userData = JSON.parse(logedUserData)
            setData(userData)
        }
    }, []);

    useEffect(() => {
        getProductDetail(params?.id)
            .then((response) => {
                setProductDetail(response.data);
                console.log('hola');
            })
            .catch((error) => {
                const errorMsg = error?.response?.data?.description;
                setError(errorMsg || "Ha ocurrido un error.");
                setLoading(false);
            })
            .finally(() => setLoading(false))
    }, [params?.id, data])

    const handleInputChange = (e) => {
        const { value } = e.target;
        setBookingData((prevData) => ({
            ...prevData,
            fechaReserva: value
        }));
    };

    useEffect(() => {
        if (productDetail && data) {
            setBookingData({
                idProducto: productDetail.id || "",
                emailUsuario: data.email || "",
                producto: productDetail.nombre || "",
                valorReserva: productDetail.precio || "",
                fechaReserva: selectedDate?.format("YYYY-MM-DD") || "",
            });
        }
    }, [productDetail, data, selectedDate]);

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
                console.log("reserva con error:", bookingData);
            });
    };
    const handleNavigate = () => {
        navigateTo("/reservas");
    };

    return (
        <div className="user-page">
            <div className="user-page__info" style={{ height: "90%", width: "60vw" }}>
                <h2>DETALLE DE LA RESERVA</h2>
                {!loading && data && <>
                    <h4>Datos personales</h4>
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <Input fullWidth id="nombre" name="nombre" type="text" value={data.nombre} />
                    </div>
                    <div>
                        <label htmlFor="apellido">Apellido</label>{" "}
                        <Input fullWidth id="apellido" name="apellido" type="text" value={data.apellido} />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Input fullWidth id="email" name="email" type="email" value={data.email} />
                    </div>
                    <h4>Datos del producto</h4>
                    <div>
                        <label htmlFor="nombreProducto">Nombre</label>
                        <Input fullWidth id="nombreProducto" name="nombreProducto" type="text" value={productDetail.nombre} />
                    </div>
                    <div>
                        <label htmlFor="precio">Precio</label>{" "}
                        <Input fullWidth id="precio" name="precio" type="text" readOnly={true} value={productDetail.precio} />
                    </div>
                    <div>
                        <label>Cantidad</label>
                        <Input
                            fullWidth
                            type="text"
                            disabled={true}
                            readOnly={true}
                            value={1}
                        />
                    </div>
                    <h4>Datos de la reserva</h4>
                    <div>
                        <label>Fecha</label>
                        <Input fullWidth type="date" onChange={handleInputChange} value={bookingData.fechaReserva} />
                    </div>
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
                </>}

                {!loading && !productDetail && (
                    <div className="detail-page__empty">
                        No es posible mostrar la información.
                    </div>
                )}
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
                    {!error ? (
                    <div className="calification">
                        <Grow in={showModalConfirm} style={{ transformOrigin: '0 0 0' , marginBottom:'0.5rem'}}
                            {...(showModalConfirm ? { timeout: 2000 } : {})}>
                            <img src={Check} alt="check" />
                        </Grow>
                        <p style={{ fontWeight: "600" }}>¡Muchas gracias!</p>
                        <p> Su reserva se ha realizado exitosamente.</p>
                    </div>) : (
                        <div className="calification">{error}</div>
                    )}
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