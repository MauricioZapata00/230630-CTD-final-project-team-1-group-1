package com.dh.catering.factory;

import com.dh.catering.domain.CategoriaProducto;
import com.dh.catering.dto.CategoriaProductoDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class CategoriaProductoFactory {

    public static CategoriaProductoDto iniciarCategoriaProductoDto() {
        CategoriaProductoDto dto = new CategoriaProductoDto();
        dto.setId(1L);
        dto.setImgUrl("http://localhost:8080/test-img.png");
        dto.setNombre("test-img");
        return dto;
    }

    public static CategoriaProducto iniciarCategoriaProducto() {
        CategoriaProducto categoria = new CategoriaProducto();
        return categoria;
    }
}
