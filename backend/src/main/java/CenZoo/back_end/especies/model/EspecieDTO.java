package CenZoo.back_end.especies.model;

import lombok.Data;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class EspecieDTO {
    private Integer idEspecie;
    private String nombreEspecie;
    private String descripcion;
    private List<AnimalNombreDTO> animales;

    public static EspecieDTO toDTO(Especie especie) {
        EspecieDTO dto = new EspecieDTO();
        dto.setIdEspecie(especie.getIdEspecie());
        dto.setNombreEspecie(especie.getNombreEspecie());
        dto.setDescripcion(especie.getDescripcion());

        // Si hay animales, los convertimos a DTO para evitar el bucle
        if (especie.getAnimales() != null) {
            dto.setAnimales(
                    especie.getAnimales().stream()
                            .map(AnimalNombreDTO::toDTO)
                            .collect(Collectors.toList())
            );
        }
        return dto;
    }
}

