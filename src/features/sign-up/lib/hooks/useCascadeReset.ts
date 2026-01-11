import { useEffect, useRef } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { SignUpWorkFormValues } from "@/entities/sign-up/model/types";

interface Arguments {
  regionId: number;
  districtId: number;
  organizationTypeId: number;
  setValue: UseFormSetValue<SignUpWorkFormValues>;
}

export const useCascadeReset = ({
  regionId,
  districtId,
  organizationTypeId,
  setValue,
}: Arguments) => {
  const prevRegionId = useRef<number | undefined>(undefined);
  const prevDistrictId = useRef<number | undefined>(undefined);
  const prevOrgTypeId = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (prevRegionId.current === undefined) {
      prevRegionId.current = regionId;
      return;
    }

    if (prevRegionId.current !== regionId) {
      setValue("districtId", 0);
      setValue("organizationTypeId", 0);
      setValue("organizationId", 0);
      prevRegionId.current = regionId;
    }
  }, [regionId, setValue]);

  useEffect(() => {
    if (prevDistrictId.current === undefined) {
      prevDistrictId.current = districtId;
      return;
    }

    if (prevDistrictId.current !== districtId) {
      setValue("organizationId", 0);
      prevDistrictId.current = districtId;
    }
  }, [districtId, setValue]);

  useEffect(() => {
    if (prevOrgTypeId.current === undefined) {
      prevOrgTypeId.current = organizationTypeId;
      return;
    }

    if (prevOrgTypeId.current !== organizationTypeId) {
      setValue("organizationId", 0);
      prevOrgTypeId.current = organizationTypeId;
    }
  }, [organizationTypeId, setValue]);
};
