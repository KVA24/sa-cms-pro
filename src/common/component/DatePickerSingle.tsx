import React, {Component} from "react";
import {observer} from "mobx-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerSingleProps {
    selected?: any,
    minDate?: any,
    disabled?: boolean,
    onChange?: any,
    placeholder?: any,
    showTimeSelect?: any
}


@observer
class DatePickerSingle extends Component<any, any>{

    constructor(props: DatePickerSingleProps) {
        super(props);
    }

    handleChangeTime = (date: Date, event: any) => {
        this.props.onChange(date)
    };

    render() {

        try {
            return (
                <DatePicker
                    selected={this.props.selected ? this.props.selected : ''}
                    minDate={this.props.minDate}
                    showTimeSelect={this.props.showTimeSelect}
                    disabled={this.props.disabled}
                    dateFormat={"dd/MM/yyyy"}
                    placeholderText={this.props.placeholder ?? 'Choose Date'}
                    onChange={this.handleChangeTime}/>
            )
        }catch (e) {
            return null
        }
    }

}

export default  DatePickerSingle;
