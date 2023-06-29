package com.dh.catering.factory;

import com.dh.catering.domain.Rol;
import com.dh.catering.dto.RolDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class RolFactory {

    public static Rol iniciarRol() {
        Rol rol = new Rol();
        return rol;
    }

    public static RolDto iniciarRolDto() {
        RolDto rol = new RolDto();
        return rol;
    }
}

