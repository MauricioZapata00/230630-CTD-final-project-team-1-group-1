package com.dh.catering.util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;

class UtilTest {

    private static final String MOCK_FECHA = "2023-06-26";
    private static final LocalDate MOCK_DATE = LocalDate.of(2023,6,26);

    @Test
    void testConvertirStringToLocalDate() {
        LocalDate date = Util.convertirStringToLocalDate(MOCK_FECHA);
        Assertions.assertEquals(2023, date.getYear());
        Assertions.assertEquals(6, date.getMonthValue());
        Assertions.assertEquals(26, date.getDayOfMonth());
    }

    @Test
    void testConvertirLocalDateToString() {
        Assertions.assertEquals(MOCK_FECHA, Util.convertirLocalDateToString(MOCK_DATE));
    }

    @Test
    void testDateToTimeStamp() {
        Date date =  Date.from(MOCK_DATE.atStartOfDay(ZoneOffset.UTC).toInstant());
        Timestamp resultado = Util.dateToTimestamp(date);
        Assertions.assertEquals(1687737600000L, resultado.getTime());
    }
}
