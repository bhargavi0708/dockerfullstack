package com.example.album.repository;

import com.example.album.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    // JpaRepository provides all basic CRUD methods
}
