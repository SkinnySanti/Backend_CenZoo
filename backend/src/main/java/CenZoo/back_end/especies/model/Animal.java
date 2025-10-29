package CenZoo.back_end.especies.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "animales")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAnimal;
    private String nombreAnimal;
    private String edadAnimal;
    private String generoAnimal;

    @ManyToOne
    @JoinColumn(name = "idEspecie", referencedColumnName = "idEspecie")
    private Especie especie;
}
