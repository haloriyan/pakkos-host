import React, { useEffect, useState } from "react";
import Header from "../Partials/Header";
import Navigator from "./CreateComponents/Navigator";
import Basic from "./CreateComponents/Basic";
import Location from "./CreateComponents/Location";
import Building from "./CreateComponents/Building";
import axios from "axios";
import config from "../config";
import Room from "./CreateComponents/Room";
import Facility from "./CreateComponents/Facility";
import Quantity from "./CreateComponents/Quantity";
import Price from "./CreateComponents/Price";
import Finish from "./CreateComponents/Finish";
import useUser from "../Hooks/useUser";

const Create = () => {
    const [user, setUser] = useUser(true);

    const [fields, setFields] = useState({
        name: '',
        consumer_name: '',
        slug:  '',
        description: '',
        province: '',
        provinceID: null,
        city: '',
        cityID: null,
        subdistrict: '',
        address: '',
        address_note: '',
        front_building_photo: null,
        inside_building_photo: null,
        streetview_building_photo: null,
        front_room_photo: null,
        inside_room_photo: null,
        bath_room_photo: null,
        other_photo: null,
        room_size: '',
        room_total: 0,
        room_available: 0,
        facilities: [],
        price: 100000,
        price_inclusion: []
    });
    const [step, setStep] = useState(0);
    const [ableToNext, setAbleToNext] = useState(false);

    const typing = (toChanges) => {
        let theFields = {...fields};
        let keys = Object.keys(toChanges);
        keys.map((key, k) => {
            theFields[key] = toChanges[key];
        })
        setFields(theFields);
    }

    const submit = () => {
        let formData = new FormData();
        formData.append('user_id', user.id);
        let keys = Object.keys(fields);
        let toSubmit = {};
        keys.map((key, k) => {
            formData.append(key, fields[key]);
            toSubmit[key] = fields[key];
        })


        axios.post(`${config.baseUrl}/api/listing/create`, formData)
        .then(response => {
            let res = response.data;
            setStep(7)
        })
    }

    return (
        <>
            <Header active={'listing'} />
            <div className="content">
                {
                    step === 0 &&
                    <Basic typing={typing} fields={fields} ableToNext={ableToNext} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 1 &&
                    <Location typing={typing} fields={fields} ableToNext={ableToNext} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 2 &&
                    <Building typing={typing} fields={fields} ableToNext={ableToNext} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 3 &&
                    <Room typing={typing} fields={fields} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 4 &&
                    <Facility typing={typing} fields={fields} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 5 &&
                    <Quantity typing={typing} fields={fields} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 6 &&
                    <Price typing={typing} fields={fields} setAbleToNext={setAbleToNext} />
                }
                {
                    step === 7 &&
                    <Finish />
                }

                <div style={{height: 100}}></div>
                {
                    step <= 6 &&
                    <Navigator 
                        ableToNext={ableToNext}
                        step={step}
                        onNext={() => {
                            if (step === 6) {
                                submit()
                                // alert('finish');
                            } else {
                                setStep(step + 1);
                            }
                            setAbleToNext(false);
                        }}
                        onBack={() => {
                            if (step > 0) {
                                setStep(step - 1);
                            }
                        }}
                    />
                }
            </div>
        </>
    )
}

export default Create;