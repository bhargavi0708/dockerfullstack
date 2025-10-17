package com.example.album.controller;

import com.example.album.model.Album;
import com.example.album.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/albums")
@CrossOrigin(origins = "http://localhost:5173") // React frontend URL
public class AlbumController {

    @Autowired
    private AlbumRepository albumRepository;

    // GET all albums
    @GetMapping
    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    // GET album by ID
    @GetMapping("/{id}")
    public Album getAlbumById(@PathVariable Long id) {
        return albumRepository.findById(id).orElse(null);
    }

    // POST create new album
    @PostMapping
    public Album createAlbum(@RequestBody Album album) {
        return albumRepository.save(album);
    }

    // PUT update album
    @PutMapping("/{id}")
    public Album updateAlbum(@PathVariable Long id, @RequestBody Album updatedAlbum) {
        return albumRepository.findById(id).map(album -> {
            album.setTitle(updatedAlbum.getTitle());
            album.setArtist(updatedAlbum.getArtist());
            album.setGenre(updatedAlbum.getGenre());
            album.setYear(updatedAlbum.getYear());
            return albumRepository.save(album);
        }).orElse(null);
    }

    // DELETE album
    @DeleteMapping("/{id}")
    public void deleteAlbum(@PathVariable Long id) {
        albumRepository.deleteById(id);
    }
}
