package CenZoo.back_end.usuarios.controller;

import CenZoo.back_end.usuarios.entity.Usuario;
import CenZoo.back_end.usuarios.service.IServiceUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class ControllerUsuario {
    @Autowired
    private IServiceUsuario serviceUsuario;

    @PostMapping("/agregarUsuario")
    public ResponseEntity<?> agregarUsuario (@RequestBody Usuario usuario){
        //Se asegura la entrada del id en null para que JPA haga un INSERT
        usuario.setId(null);
        Usuario nuevoUsuario = serviceUsuario.agregarUsuario(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoUsuario);
    }

    @GetMapping("/listarUsuarios")
    public ResponseEntity<List<Usuario>> listarUsuarios (){
        List<Usuario> usuarios = serviceUsuario.listarUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer id) {
        Optional<Usuario> usuarioEncontrado = serviceUsuario.buscarUsuarioPorId(id);
        //Condición, si existe obtiene el valor del Optional- Sino, retorna Not Found
        return usuarioEncontrado.isPresent() ? ResponseEntity.ok(usuarioEncontrado.get())
                                             : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
    }

    @PutMapping("/agregarUsuario/{id}")
    public ResponseEntity<?> editarUsuario(@PathVariable Integer id, @RequestBody Usuario usuario){
        //Se Settea el  id con el valor proporcionado por el usuario
        try{
            usuario.setId(id);
            Usuario usuarioEditado = serviceUsuario.agregarUsuario(usuario);
            return ResponseEntity.ok(usuarioEditado);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Integer id){
        try{
            serviceUsuario.eliminarUsuario(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Cliente Eliminado Exitosamente");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
