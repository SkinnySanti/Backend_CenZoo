package CenZoo.back_end.especies.controller;

import CenZoo.back_end.especies.model.Especie;
import CenZoo.back_end.especies.model.EspecieDTO;
import CenZoo.back_end.especies.service.IServiceExpecies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/especie")
public class EspecieCrontoller {
    @Autowired
    private IServiceExpecies serviceEspecies;

    @GetMapping("/listarEspecies")
    public ResponseEntity<List<EspecieDTO>> listarEspecies(){
        List<Especie> especies = serviceEspecies.listarEspecies();

        //Convertir cada animal a su DTO correspondiente
        List<EspecieDTO> especieDTOS = especies.stream().map(EspecieDTO::toDTO).toList();
        return ResponseEntity.ok(especieDTOS);
    }

    @PostMapping("/crearEspecie")
    public ResponseEntity<?> crearEspecie(@RequestBody EspecieDTO especieDTO) {
        try {
            Especie especie = new Especie();
            especie.setIdEspecie(null);
            especie.setNombreEspecie(especieDTO.getNombreEspecie());
            especie.setDescripcion(especieDTO.getDescripcion());

            Especie especieCreada = serviceEspecies.agregarEspecie(especie);
            return ResponseEntity.status(HttpStatus.CREATED).body(EspecieDTO.toDTO(especieCreada));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al crear la especie: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarEspeciePorId(@PathVariable Integer id) {
        Optional<Especie> especieEncontrada = serviceEspecies.buscarEspeciePorId(id);

        return especieEncontrada
                .map(especie -> ResponseEntity.ok(EspecieDTO.toDTO(especie)))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Especie con ID " + id + " no fue encontrada"));
    }

    @PutMapping("/crearEspecie/{id}")
    public ResponseEntity<?> actualizarEspecie(@PathVariable Integer id, @RequestBody EspecieDTO especieDTO) {
        Optional<Especie> especieExistente = serviceEspecies.buscarEspeciePorId(id);

        if (especieExistente.isPresent()) {
            Especie especie = especieExistente.get();
            especie.setNombreEspecie(especieDTO.getNombreEspecie());
            especie.setDescripcion(especieDTO.getDescripcion());

            Especie especieActualizada = serviceEspecies.agregarEspecie(especie);
            return ResponseEntity.ok(EspecieDTO.toDTO(especieActualizada));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especie con ID " + id + " no fue encontrada");
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarEspecie(@PathVariable Integer id) {
        Optional<Especie> especieExistente = serviceEspecies.buscarEspeciePorId(id);

        if (especieExistente.isPresent()) {
            serviceEspecies.eliminarEspecie(id);
            return ResponseEntity.ok("Especie con ID " + id + " fue eliminada correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Especie con ID " + id + " no fue encontrada");
        }
    }
}
