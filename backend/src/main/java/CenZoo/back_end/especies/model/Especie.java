package CenZoo.back_end.especies.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "especie")

@Table(name = "especies")
public class Especie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEspecie;
    private String nombreEspecie;
    private String descripcion;

    @OneToMany(mappedBy = "especie")
    private List<Animal> animales;
}
