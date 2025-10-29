package CenZoo.back_end.especies.controller;

import CenZoo.back_end.especies.model.Especie;
import CenZoo.back_end.especies.service.IServiceExpecies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/especie")
public class EspecieCrontoller {
    @Autowired
    private IServiceExpecies serviceExpecies;

    @GetMapping("/listarEspecies")
    public ResponseEntity<List<Especie>> listarEspecies(){
        List<Especie> especies = serviceExpecies.listarEspecies();
        return ResponseEntity.ok(especies);
    }

    @PostMapping("/crearEspecie")
    public ResponseEntity<?> crearEspecie(@RequestBody Especie especie){
        especie.setIdEspecie(null);
        Especie especieCreada = serviceExpecies.agregarEspecie(especie);
        return ResponseEntity.status(HttpStatus.CREATED).body(especieCreada);
    }

    @GetMapping("/especie/{id}")
    public ResponseEntity<?> buscarEspeciePorId(@PathVariable Integer id){
        Optional<Especie> especieEncontrada = serviceExpecies.buscarEspeciePorId(id);
        return especieEncontrada.isPresent() ? ResponseEntity.ok(especieEncontrada.get())
                                             : ResponseEntity.status(HttpStatus.NOT_FOUND)
                                                .body("Especie con ID " + id + " no encontrada");
    }

    @PutMapping("/crearEspecie/{id}")
    public ResponseEntity<?> editarEspecie(@PathVariable Integer id, Especie especie){
        try{
            especie.setIdEspecie(id);
            Especie especieEditada = serviceExpecies.agregarEspecie(especie);
            return ResponseEntity.ok(especieEditada);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
public ResponseEntity<?> eliminarEspecie(@PathVariable Integer id){
        try{
            serviceExpecies.eliminarEspecie(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Cliente Eliminado Exitosamente");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
