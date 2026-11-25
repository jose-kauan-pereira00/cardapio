package com.example.cardapio.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cardapio.dto.FoodRequestDTO;
import com.example.cardapio.dto.FoodResponseDTO;
import com.example.cardapio.model.Food;
import com.example.cardapio.repository.FoodRepository;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired
    private FoodRepository repository;

    @GetMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<FoodResponseDTO> getAll() {

        List<FoodResponseDTO> foods = repository
                .findAll().stream()
                .map(FoodResponseDTO::new).toList();

        return foods;
    }

    @PostMapping
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public void saveFood(@RequestBody FoodRequestDTO data) {
        Food food = new Food(data);
        repository.save(food);

    }

    @DeleteMapping("/{id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Food> food = repository.findById(id);

        if (food.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        repository.delete(food.get());
        return ResponseEntity.noContent().build();
    }
}
