package com.esm.positions;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Positions {

    @Id
    @SequenceGenerator(name = "positions_seq", sequenceName = "positions_seq",allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "positions_seq")
    private Integer id;

    private String posTitle;

}
