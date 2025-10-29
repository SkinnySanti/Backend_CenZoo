package CenZoo.back_end.especies.model;

import lombok.Data;

@Data
public class AnimalDTO {
    private Integer idAnimal;
    private String nombreAnimal;
    private String edadAnimal;
    private String generoAnimal;
    private Integer idEspecie;

    public static AnimalDTO toDTO(Animal animal) {
        AnimalDTO dto = new AnimalDTO();
        dto.setIdAnimal(animal.getIdAnimal());
        dto.setNombreAnimal(animal.getNombreAnimal());
        dto.setEdadAnimal(animal.getEdadAnimal());
        dto.setGeneroAnimal(animal.getGeneroAnimal());
        dto.setIdEspecie(animal.getEspecie().getIdEspecie());

        return dto;
    }
}



