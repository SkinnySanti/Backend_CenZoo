package CenZoo.back_end.especies.model;

import CenZoo.back_end.especies.model.Animal;
import lombok.Data;

@Data
public class AnimalNombreDTO {
    private String nombreAnimal;

    public static AnimalNombreDTO toDTO(Animal animal) {
        AnimalNombreDTO dto = new AnimalNombreDTO();
        dto.setNombreAnimal(animal.getNombreAnimal());
        return dto;
    }
}