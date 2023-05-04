import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import UpdateService from "./UpdateService";
import EditPropery from "./EditPropery";
import UpdateFoodService from "./UpdateFoodService/UpdateFoodService";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useGetAccommodationByUserIDQuery } from "../../../Features/api/apiSlice";
import { useNavigate } from "react-router";

const BodyProperty = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedProperty, setSelectedProperty] = useState(null);
  console.log(selectedProperty);

  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userInfo);

  const { data } = useGetAccommodationByUserIDQuery(userId._id, {
    refetchOnMountOrArgChange: true,
    refetchInterval: 1000, // Refetch every 5 seconds
  });
  console.log(data);

  const accommodations = data?.accommodations || [];
  const services = data?.services || [];
  const foodservices = data?.foodservices || [];
  const allProperties = accommodations.concat(services, foodservices);

  console.log(allProperties);

  return (
    <>
      <div class="pl-0 md:pl-64 ">
        <section className="bg-gray-200 w-full h-screen flex flex-col">
          <div className="ml-9 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {allProperties.map((property) => (
              <div
                key={property._id}
                onClick={() => {
                  setSelectedProperty(property);
                  onOpen();
                }}
                className="group relative"
              >
                <div className="min-h-80  w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 lg:h-80">
                  <img
                    src={property.photos?.[0]}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span href="">
                        <span className=" font-semibold absolute inset-0" />
                        <p className="font-semibold">{property.name}</p>
                      </span>
                    </h3>
                    <p className="mt-1 text-sm  text-gray-500">
                      {property.address}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {property.type}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {selectedProperty && (
            <Modal isOpen={isOpen} onClose={onClose} size="6xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{selectedProperty.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {selectedProperty.accommodation ? (
                    <EditPropery
                      selectedProperty={selectedProperty}
                      onClose={onClose}
                    />
                  ) : selectedProperty.foodservice ? (
                    <UpdateFoodService
                      details={selectedProperty}
                      onClose={onClose}
                    />
                  ) : (
                    <UpdateService
                      details={selectedProperty}
                      onClose={onClose}
                    />
                  )}
                </ModalBody>
                <ModalFooter>
                  <button
                    onClick={onClose}
                    type="button"
                    className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  >
                    Close
                  </button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </section>
      </div>
    </>
  );
};

export default BodyProperty;
