import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavigationBar, TopBar } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { MonthPayDetailModal } from "./Modal";
import { HistoricMonthpaySlideComponent } from "./HistoricMonthpaySlideComponent";
import { UserApi } from "../../services/user.api";
import { MonthPaymentModal } from "../../components/Modal";
import { useParams } from "react-router";

export function MonthPay() {
  const user = UserApi();
  const { housingId } = useParams();

  // ---------------------- User Data ----------------------
  const fetchUser = async () => {
    try {
      const { data } = await user.findOne();
      if (data.success) {
        localStorage.setItem("cname", data?.data?.company?.name || "");
        localStorage.setItem("cicon", data?.data?.company?.icon || "");
      }
      return data.data;
    } catch (err) {
      throw new Error("Erreur lors de la récupération de l'utilisateur : " + err.message);
    }
  };

  const { data } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  // ---------------------- Modal: Details ----------------------
  const [modalState, setModalState] = useState(false);
  const [dataModal, setDataModal] = useState(null);

  const setModal = (item) => {
    setDataModal(item);
    setModalState(true);
  };

  const closeModal = (arg) => { setModalState(arg) };

  // ---------------------- Modal: Payment ----------------------
  const [paymentModalState, setPaymentModalState] = useState(false);
  const [funct, setFunct] = useState(null);

  const setPaymentForm = (method) => {
    setFunct(() => method);
    setPaymentModalState(true);
  };

  const closePaymentForm = (arg) => { setPaymentModalState(arg) };

  return (
    <div className="container-fluid bg-light">
      {/* ----------------- Modals ----------------- */}
      {modalState && <MonthPayDetailModal method={closeModal} data={dataModal} />}
      {paymentModalState && (
        <MonthPaymentModal refetch={funct} propertyId={housingId} method={closePaymentForm} />
      )}

      {/* ----------------- Header ----------------- */}
      <div className="row">
        <TopBar />
      </div>
      <div className="row sticky-top">
        <NavigationBar page={7} />
      </div>

      {/* ----------------- Main Content ----------------- */}
      <div className="row justify-content-center border px-3">
        <div className="col-lg-10 py-5">
          <div className="row mt-4">
            <div className="col-lg-12 col-md-12">
              <div className="row d-flex justify-content-between border rounded-2 p-4 mb-4">
                <div className="col-md-8 d-flex gap-3 mb-2">
                  <img
                    src={data?.image}
                    height={45}
                    width={45}
                    alt="Logo"
                    className="rounded-circle border border-3 p-1 border-secondary"
                  />
                  <div className="d-flex flex-column">
                    <span className="text-secondary">
                      {data?.fname} {data?.lname}
                    </span>
                    <span className="color-gray small">En ligne</span>
                  </div>
                </div>

                <div className="col-md-4 d-flex align-items-center">
                  {data?.companyStatus === 0 && data?.status === 1 ? (
                    <a className="mb-3 btn px-3 btn-outline-main" href="/creation-entreprise">
                      Ouvrir une entreprise immobilière
                    </a>
                  ) : data?.companyStatus === 2 && data?.status === 1 ? (
                    <a
                      className="mb-3 btn px-3 btn-main"
                      href={`/entreprise/${data?.company?.id}`}
                    >
                      Mon entreprise
                    </a>
                  ) : data?.companyStatus === 0 && data?.status === 2 ? (
                    <a className="mb-3 btn px-3 btn-main" href="/admin">
                      Dashboard admin
                    </a>
                  ) : null}
                </div>
              </div>
            </div>

            {/* ----------------- Historic Payments ----------------- */}
            <HistoricMonthpaySlideComponent
              setPaymentForm={setPaymentForm}
              setModal={setModal}
            />
          </div>
        </div>
      </div>

      {/* ----------------- Footer ----------------- */}
      <div className="row">
        <Footer />
      </div>
    </div>
  );
}
