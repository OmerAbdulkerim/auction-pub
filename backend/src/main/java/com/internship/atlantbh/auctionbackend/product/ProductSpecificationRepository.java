package com.internship.atlantbh.auctionbackend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductSpecificationRepository {

    private final ProductRepository productRepository;

    private Specification<Product> createSpecification(ProductFilter input) {
        return switch (input.getOperator()) {
            case EQUALS -> (root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get(input.getField()).get(input.getSecondaryField()),
                            castToRequiredType(root.get(input.getField()).get(input.getSecondaryField()).getJavaType(),
                                    input.getValue()));
            case LIKE -> (root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get(input.getField())), "%" + input.getValue().toLowerCase() + "%");
            case IN -> (root, query, criteriaBuilder) -> root.get(input.getField()).get(input.getSecondaryField()).in(castToRequiredType(
                    root.get(input.getField()).get(input.getSecondaryField()).getJavaType(),
                    input.getValues()));
            default -> throw new RuntimeException("Operation not supported yet");
        };
    }

    private Object castToRequiredType(final Class fieldType, final String value) {
        if(fieldType.isAssignableFrom(Double.class)) {
            return Double.valueOf(value);
        } else if(fieldType.isAssignableFrom(Integer.class)) {
            return Integer.valueOf(value);
        } else if(Enum.class.isAssignableFrom(fieldType)) {
            return Enum.valueOf(fieldType, value);
        } else if (fieldType.isAssignableFrom(UUID.class)) {
            return UUID.fromString(value);
        }
        return null;
    }

    private Object castToRequiredType(final Class fieldType, List<String> value) {
        List<Object> lists = new ArrayList<>();
        for (String s : value) {
            lists.add(castToRequiredType(fieldType, s));
        }
        return lists;
    }

     public Page<Product> getQueryResult(List<ProductFilter> filters, Pageable pageable){
        if(filters.size()>0) {
            Specification<Product> specification = Specification.where(createSpecification(filters.remove(0)));
            for (ProductFilter input : filters) {
                specification = specification.and(createSpecification(input));
            }
            return productRepository.findAll(specification, pageable);
        } else {
            return productRepository.findAll(pageable);
        }
    }
}
