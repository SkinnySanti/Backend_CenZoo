package CenZoo.back_end.especies.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Table(name = "animales")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idAnimal;
    private String nombreAnimal;
    private Integer edadAnimal;
    private String generoAnimal;

    @ManyToOne
    @JoinColumn(name = "idEspecie", referencedColumnName = "idEspecie")
    private Especie especie;
}
