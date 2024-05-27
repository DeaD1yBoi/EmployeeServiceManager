package com.esm.positions;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("positions")
@RequiredArgsConstructor
@Tag(name = "Positions")
public class PositionsController {

    private final PositionsService service;

    @GetMapping("")
    public List<Positions> findAll(){
        return service.findAll();
    }

}
