package com.dh.catering.exceptions;

import com.dh.catering.util.Util;
import lombok.Data;

import java.util.Date;

@Data
public class MensajeError {

    private int statusCode;
    private Date timeStamp;
    private String message;
    private String description;

    public MensajeError() {
        Date date = new Date();
        this.timeStamp = Util.dateToTimestamp(date);
    }

}
