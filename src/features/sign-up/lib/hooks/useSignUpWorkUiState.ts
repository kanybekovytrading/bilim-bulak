type QueryLike = {
  isPending: boolean;
  isError: boolean;
};

interface Arguments {
  regionId: number;
  districtId: number;
  organizationTypeId: number;
  organizationId: number;
  regionsQ: QueryLike;
  districtsQ: QueryLike;
  orgTypesQ: QueryLike;
  orgsQ: QueryLike;
  isSubmitting: boolean;
  isRegisterPending: boolean;
}

export const useSignUpWorkUiState = ({
  regionId,
  districtId,
  organizationTypeId,
  organizationId,
  regionsQ,
  districtsQ,
  orgTypesQ,
  orgsQ,
  isSubmitting,
  isRegisterPending,
}: Arguments) => {
  const hasAllSelected =
    regionId > 0 &&
    districtId > 0 &&
    organizationTypeId > 0 &&
    organizationId > 0;

  const regionsBlocked = regionsQ.isPending || regionsQ.isError;

  const districtsBlocked =
    regionId === 0 || districtsQ.isPending || districtsQ.isError;

  const orgTypesBlocked = orgTypesQ.isPending || orgTypesQ.isError;

  const orgsBlocked =
    districtId === 0 ||
    organizationTypeId === 0 ||
    orgsQ.isPending ||
    orgsQ.isError;

  const isSubmittingAny = isSubmitting || isRegisterPending;

  const isContinueDisabled =
    isSubmittingAny ||
    !hasAllSelected ||
    regionsBlocked ||
    districtsBlocked ||
    orgTypesBlocked ||
    orgsBlocked;

  return {
    hasAllSelected,
    regionsBlocked,
    districtsBlocked,
    orgTypesBlocked,
    orgsBlocked,
    isSubmittingAny,
    isContinueDisabled,
  };
};
