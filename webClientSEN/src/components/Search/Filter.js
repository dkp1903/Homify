import React from "react";
import { useField, Field, Form, withFormik } from "formik";
import Select from "react-select";
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';

import { SERVER_URL } from '../../utils/constants';

const amenitiesOptions = [
	{ value: "isFurnished", label: "Furnished" },
	{ value: "isHospital", label: "Hospital" },
	{ value: "isSchool", label: "School" },
	{ value: "isGym", label: "Gym" },
];

const typeOptions = [
	{ value: "flat", label: "Flat" },
	{ value: "bungalow", label: "Bungalow" },
	{ value: "any", label: "Any" },
];

const marks = (min,max) => {
	return [
		{ value: min, label: String(min)},
		{ value: max, label: String(max)},
	];
};

const SliderValues = ( type, name ) => {
	if (type==="single") {
		return {
			defaultValue: 1,
			min: 1,
			max: 10,
			step: 1,
		};
	} else {
		if (name==="price") {
			return {
				defaultValue: [10,1000],
				min: 10,
				max: 1000,
				step: 10,
			};
		} else {
			return {
				defaultValue: [100,5000],
				min: 100,
				max: 5000,
				step: 10,
			};
		}
	}
};

const FormSelect = ({
	field,
	form: { setFieldValue, setFieldTouched },
	...props
}) => (
	<Select
		classNamePrefix="select"
		options={props.options}
		isMulti={props.isMulti}
		isClearable={true}
		isSearchable={true}
		onChange={value => setFieldValue(props.label, value)}
		onBlur={() => setFieldTouched(props.label, true)}
	/>
);

const FormRadio = ({
    field,
    form: { setFieldValue, setFieldTouched, values },
    ...props
}) => (
    <Radio
        checked={values.category===props.label}
        color="primary"
        onChange={() => setFieldValue("category", props.label)}
        onBlur={() => setFieldTouched("category", true)}
    />
);

const FormSlider = (props) => {
	const [ field, meta, helpers ] = useField(props.name);

	const [value, setValue] = React.useState(props.values.defaultValue);
	const handleChange = (event, newValue) => {
		setValue(newValue);
		helpers.setValue(newValue);
		helpers.setTouched(true);
	};

	return(
		<Slider
			min={props.values.min}
			max={props.values.max}
			marks={marks(props.values.min,props.values.max)}
			value={value}
			step={props.values.step}
			onChange={handleChange}
			valueLabelDisplay="auto"
			aria-labelledby="range-slider"
		/>
	);
};

class FilterForm extends React.Component {

	render() {
		return (
            <div className="container">
                <div className="card">
                    <div className="column is-centered">
                        <div className="card-content">
                            <div className="content">
                                <h1 class="is-size-2">
                                    Filters
                                </h1>
                                <Form>
                                    <div class="field">
                                        <label class="label">Category</label>
                                        <div class="columns is-vcentered is-centered" style={{width:"250px"}}>
                                            <div class="column is-centered">
                                                <div class="control">
                                                    <Field
                                                        class="input"
                                                        name="category"
                                                        label="buy"
                                                        component={FormRadio}
                                                    />
                                                    <label>Buy</label>
                                                </div>
                                            </div>
                                            <div class="column is-centered">
                                                <div class="control">
                                                    <Field
                                                        class="input"
                                                        name="category"
                                                        label="rent"
                                                        component={FormRadio}
                                                    />
                                                    <label>Rent</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Type</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <Field
                                                class="input"
                                                name="type"
                                                label="type"
                                                isMulti={false}
                                                component={FormSelect}
                                                options={typeOptions}
                                                style={{width:"250px"}}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Amenities</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <Field
                                                class="input"
                                                name="amenities"
                                                label="amenities"
                                                isMulti={true}
                                                component={FormSelect}
                                                options={amenitiesOptions}
                                                style={{width:"250px"}}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Price (Lacs INR)</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <FormSlider
                                                name="price"
                                                label="price"
                                                type="range"
                                                style={{width:"250px"}}
                                                values={SliderValues("range", "price")}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Area (Sq. Feet)</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <FormSlider
                                                name="totalSqft"
                                                label="area"
                                                type="range"
                                                style={{width:"250px"}}
                                                values={SliderValues("range", "area")}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Bedrooms</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <FormSlider
                                                name="noOfBedrooms"
                                                label="bedroom"
                                                type="single"
                                                style={{width:"250px"}}
                                                values={SliderValues("single", "bedroom")}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Bathrooms</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <FormSlider
                                                name="noOfBathrooms"
                                                label="bathroom"
                                                type="single"
                                                style={{width:"250px"}}
                                                values={SliderValues("single", "bathroom")}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label class="label">Balconies</label>
                                        <div class="control" style={{width:"250px"}}>
                                            <FormSlider
                                                name="noOfBalconies"
                                                label="balcony"
                                                type="single"
                                                style={{width:"250px"}}
                                                values={SliderValues("single", "balcony")}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control is-centered">
                                            <button class="button is-link is-rounded is-centered" type="submit" style={{marginTop:"5%", width:"250px"}}>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
};

const Filter = withFormik({
    mapPropsToValues() {
        return ({
            category : 'buy',
			type : { value: "any", label: "Any" },
			price : [10,1000],
			totalSqft : [100,5000],
			noOfBalconies : '1',
			noOfBathrooms : '1',
			noOfBedrooms : '1',
			amenities : []
        });
    },
	async handleSubmit(values, { props, setSubmitting }){
	    const {
            category,
			type,
			price,
			totalSqft,
			noOfBalconies,
			noOfBathrooms,
			noOfBedrooms,
			amenities = []
		} = values;
		const body = {
			noOfBalconies,
			noOfBathrooms,
            noOfBedrooms,
            category,
			totalSqft: totalSqft && {
				max: totalSqft[1],
				min: totalSqft[0]
			},
			price: price && {
				max: price[1],
				min: price[0]
			},
			type: type && type.value,
		}
		amenities.forEach((item) => {
			body[item.value] = true;
		});
		props.setLoading();

		const URL = SERVER_URL + '/property/filter';
		const response = await fetch(URL, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(body)
		});
		const data = await response.json(); 
		setSubmitting(false);
		props.setProperty(data.property);
	}
})(FilterForm);

export default Filter;