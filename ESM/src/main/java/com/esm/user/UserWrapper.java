package com.esm.user;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserWrapper {

    private Integer id;
    private String username;
    private String fullName;
    private String posTitle;
    private String depTitle;
    private List<String> roleNames;
    private List<String> srvNames;

}
