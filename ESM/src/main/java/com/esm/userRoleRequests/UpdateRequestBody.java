package com.esm.userRoleRequests;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateRequestBody {

    @NotNull(message = "Id field is mandatory")
    Integer id;

    @NotNull(message = "Response field is mandatory")
    Boolean response;

    String note;

}
